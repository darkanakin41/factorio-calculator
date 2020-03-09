<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200308105825 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE factorio_recipe (id CHAR(36) NOT NULL COMMENT \'(DC2Type:uuid)\', mod_id CHAR(36) DEFAULT NULL COMMENT \'(DC2Type:uuid)\', name VARCHAR(255) NOT NULL, crafting_time DOUBLE PRECISION NOT NULL, INDEX IDX_44FCCBCB338E21CD (mod_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE factorio_recipe_component (id CHAR(36) NOT NULL COMMENT \'(DC2Type:uuid)\', recipe_id CHAR(36) DEFAULT NULL COMMENT \'(DC2Type:uuid)\', component_id CHAR(36) DEFAULT NULL COMMENT \'(DC2Type:uuid)\', quantity INT NOT NULL, INDEX IDX_A62F38E659D8A214 (recipe_id), INDEX IDX_A62F38E6E2ABAFFF (component_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE factorio_item (id CHAR(36) NOT NULL COMMENT \'(DC2Type:uuid)\', mod_id CHAR(36) DEFAULT NULL COMMENT \'(DC2Type:uuid)\', name VARCHAR(255) NOT NULL, type VARCHAR(255) NOT NULL, utility VARCHAR(255) NOT NULL, item_per_second INT DEFAULT NULL, crafting_speed DOUBLE PRECISION DEFAULT NULL, base_productivity DOUBLE PRECISION NOT NULL, energy_consumption DOUBLE PRECISION DEFAULT NULL, speed DOUBLE PRECISION DEFAULT NULL, polution DOUBLE PRECISION DEFAULT NULL, productivity DOUBLE PRECISION DEFAULT NULL, INDEX IDX_2A3E7884338E21CD (mod_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE factorio_recipe_output (id CHAR(36) NOT NULL COMMENT \'(DC2Type:uuid)\', recipe_id CHAR(36) DEFAULT NULL COMMENT \'(DC2Type:uuid)\', output_id CHAR(36) DEFAULT NULL COMMENT \'(DC2Type:uuid)\', quantity INT NOT NULL, INDEX IDX_196AA42D59D8A214 (recipe_id), INDEX IDX_196AA42DDE097880 (output_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE factorio_mod (id CHAR(36) NOT NULL COMMENT \'(DC2Type:uuid)\', name VARCHAR(255) NOT NULL, description LONGTEXT DEFAULT NULL, website_url VARCHAR(255) DEFAULT NULL, source_url VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE factorio_recipe ADD CONSTRAINT FK_44FCCBCB338E21CD FOREIGN KEY (mod_id) REFERENCES factorio_mod (id)');
        $this->addSql('ALTER TABLE factorio_recipe_component ADD CONSTRAINT FK_A62F38E659D8A214 FOREIGN KEY (recipe_id) REFERENCES factorio_recipe (id)');
        $this->addSql('ALTER TABLE factorio_recipe_component ADD CONSTRAINT FK_A62F38E6E2ABAFFF FOREIGN KEY (component_id) REFERENCES factorio_item (id)');
        $this->addSql('ALTER TABLE factorio_item ADD CONSTRAINT FK_2A3E7884338E21CD FOREIGN KEY (mod_id) REFERENCES factorio_mod (id)');
        $this->addSql('ALTER TABLE factorio_recipe_output ADD CONSTRAINT FK_196AA42D59D8A214 FOREIGN KEY (recipe_id) REFERENCES factorio_recipe (id)');
        $this->addSql('ALTER TABLE factorio_recipe_output ADD CONSTRAINT FK_196AA42DDE097880 FOREIGN KEY (output_id) REFERENCES factorio_item (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE factorio_recipe_component DROP FOREIGN KEY FK_A62F38E659D8A214');
        $this->addSql('ALTER TABLE factorio_recipe_output DROP FOREIGN KEY FK_196AA42D59D8A214');
        $this->addSql('ALTER TABLE factorio_recipe_component DROP FOREIGN KEY FK_A62F38E6E2ABAFFF');
        $this->addSql('ALTER TABLE factorio_recipe_output DROP FOREIGN KEY FK_196AA42DDE097880');
        $this->addSql('ALTER TABLE factorio_recipe DROP FOREIGN KEY FK_44FCCBCB338E21CD');
        $this->addSql('ALTER TABLE factorio_item DROP FOREIGN KEY FK_2A3E7884338E21CD');
        $this->addSql('DROP TABLE factorio_recipe');
        $this->addSql('DROP TABLE factorio_recipe_component');
        $this->addSql('DROP TABLE factorio_item');
        $this->addSql('DROP TABLE factorio_recipe_output');
        $this->addSql('DROP TABLE factorio_mod');
    }
}
