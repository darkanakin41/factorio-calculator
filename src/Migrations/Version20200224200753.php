<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200224200753 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE product_component (id CHAR(36) NOT NULL COMMENT \'(DC2Type:uuid)\', product_id CHAR(36) DEFAULT NULL COMMENT \'(DC2Type:uuid)\', component_id CHAR(36) DEFAULT NULL COMMENT \'(DC2Type:uuid)\', quantity INT NOT NULL, INDEX IDX_275E17DA4584665A (product_id), INDEX IDX_275E17DAE2ABAFFF (component_id), UNIQUE INDEX product_component_uniq (product_id, component_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE product (id CHAR(36) NOT NULL COMMENT \'(DC2Type:uuid)\', name VARCHAR(255) NOT NULL, type VARCHAR(255) NOT NULL, utility VARCHAR(255) NOT NULL, crafting_time DOUBLE PRECISION NOT NULL, output INT NOT NULL, item_per_second INT DEFAULT NULL, crafting_speed DOUBLE PRECISION DEFAULT NULL, base_productivity DOUBLE PRECISION NOT NULL, energy_consumption DOUBLE PRECISION DEFAULT NULL, speed DOUBLE PRECISION DEFAULT NULL, polution DOUBLE PRECISION DEFAULT NULL, productivity DOUBLE PRECISION DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE product_component ADD CONSTRAINT FK_275E17DA4584665A FOREIGN KEY (product_id) REFERENCES product (id)');
        $this->addSql('ALTER TABLE product_component ADD CONSTRAINT FK_275E17DAE2ABAFFF FOREIGN KEY (component_id) REFERENCES product (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE product_component DROP FOREIGN KEY FK_275E17DA4584665A');
        $this->addSql('ALTER TABLE product_component DROP FOREIGN KEY FK_275E17DAE2ABAFFF');
        $this->addSql('DROP TABLE product_component');
        $this->addSql('DROP TABLE product');
    }
}
