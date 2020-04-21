local ddb = import 'ddb.docker.libjsonnet';

local db_user = "factorio-calculator";
local db_password = "factorio-calculator";

local domain = std.join('.', [std.extVar("core.domain.sub"), std.extVar("core.domain.ext")]);
local port_prefix = std.extVar("docker.port_prefix");

local php_workdir = "/var/www/html";
local node_workdir = "/app";
local mysql_workdir = "/app";

local compile_command(name, args, workdir)= {
    ["ddb.emit.docker:binary[" + name + "](name)"]: name,
    ["ddb.emit.docker:binary[" + name + "](args)"]: args,
    ["ddb.emit.docker:binary[" + name + "](workdir)"]: workdir,
 };

local prefix_port(port, output_port = null)= [port_prefix + (if output_port == null then std.substr(port, std.length(port) - 2, 2) else output_port) + ":" + port];

ddb.Compose() {
	"services": {
		"db": ddb.Build("db") + ddb.User() + {
			"environment": {
                "MYSQL_ROOT_PASSWORD": db_password,
                "MYSQL_DATABASE": db_user,
                "MYSQL_USER": db_user,
                "MYSQL_PASSWORD": db_password,
			},
			[if ddb.env.is("dev") then "ports"]: prefix_port("3306"),
			"volumes": [
				"db-data:/var/lib/mysql:rw",
				ddb.path.project + ":" + mysql_workdir
			],
             labels+:
                compile_command("mysql", "mysql  -hdb -u" + db_user + " -p" + db_password, mysql_workdir)
		},
		[if ddb.env.is("dev") then "mail"]: ddb.Build("mail") + ddb.VirtualHost("80", std.join(".", ["mail", domain]), "mail", certresolver=if ddb.env.is("prod") then "letsencrypt" else null) ,
		"node": ddb.Build("node") + ddb.User() + ddb.VirtualHost("8080", std.join(".", ["node", domain]), "node", certresolver=if ddb.env.is("prod") then "letsencrypt" else null) {
			"volumes": [
				ddb.path.project + ":" + node_workdir + ":rw",
				"node-cache:/home/node/.cache:rw",
				"node-npm-packages:/home/node/.npm-packages:rw"
			],
             labels+:
                compile_command("node", "node", node_workdir) +
                compile_command("yarn", "yarn", node_workdir) +
                compile_command("vue", "vue", node_workdir)
		},
		"php": ddb.Build("php") + ddb.User() + ddb.XDebug() {
			"volumes": [
				"php-composer-cache:/composer/cache:rw",
				"php-composer-vendor:/composer/vendor:rw",
				ddb.path.project + ":" + php_workdir + ":rw",
                ddb.path.project + ".docker/php/php-config.ini:/usr/local/etc/php/conf.d/php-config.ini"
			],
            labels+:
                compile_command("php", "php", php_workdir) +
                compile_command("composer", "composer", php_workdir)
		},
		"web": ddb.Build("web") + ddb.VirtualHost("80", domain, "app", certresolver=if ddb.env.is("prod") then "letsencrypt" else null) {
			"volumes": [
				ddb.path.project + "/.docker/web/nginx.conf:/etc/nginx/conf.d/default.conf:rw",
				ddb.path.project + ":/var/www/html:rw"
			]
		}
	}
}
