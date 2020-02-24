<?php

namespace App\Repository;

use App\Entity\ProductComponent;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method ProductComponent|null find($id, $lockMode = null, $lockVersion = null)
 * @method ProductComponent|null findOneBy(array $criteria, array $orderBy = null)
 * @method ProductComponent[]    findAll()
 * @method ProductComponent[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ProductComponentRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ProductComponent::class);
    }

    // /**
    //  * @return ProductComponent[] Returns an array of ProductComponent objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('p.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?ProductComponent
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
