<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200223110027 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE product_component ADD id INT AUTO_INCREMENT NOT NULL, ADD quantity INT NOT NULL, CHANGE product_id product_id INT DEFAULT NULL, CHANGE component_id component_id INT DEFAULT NULL, DROP PRIMARY KEY, ADD PRIMARY KEY (id)');
        $this->addSql('CREATE UNIQUE INDEX product_component_uniq ON product_component (product_id, component_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE product_component MODIFY id INT NOT NULL');
        $this->addSql('DROP INDEX product_component_uniq ON product_component');
        $this->addSql('ALTER TABLE product_component DROP PRIMARY KEY');
        $this->addSql('ALTER TABLE product_component DROP id, DROP quantity, CHANGE product_id product_id INT NOT NULL, CHANGE component_id component_id INT NOT NULL');
        $this->addSql('ALTER TABLE product_component ADD PRIMARY KEY (product_id, component_id)');
    }
}
