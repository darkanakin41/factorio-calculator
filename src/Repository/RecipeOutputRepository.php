<?php

namespace App\Repository;

use App\Entity\RecipeOutput;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method RecipeOutput|null find($id, $lockMode = null, $lockVersion = null)
 * @method RecipeOutput|null findOneBy(array $criteria, array $orderBy = null)
 * @method RecipeOutput[]    findAll()
 * @method RecipeOutput[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class RecipeOutputRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, RecipeOutput::class);
    }

    // /**
    //  * @return RecipeOutput[] Returns an array of RecipeOutput objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('r.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?RecipeOutput
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
