<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use FOS\UserBundle\Model\UserManager;
use FOS\UserBundle\Model\UserManagerInterface;

class UserFixtures extends Fixture
{
    /**
     * @var UserManagerInterface
     */
    private $userManager;

    public function __construct(UserManagerInterface $userManager)
    {
        $this->userManager = $userManager;
    }

    /**
     * @inheritDoc
     */
    public function load(ObjectManager $manager)
    {
        $user = $this->userManager->createUser();
        $user->setUsername("darkanakin41");
        $user->setFullname("Pierre LEJEUNE");
        $user->setPlainPassword("azerty123");
        $user->setEmail("darkanakin41@gmail.com");
        $user->setEnabled(true);
        $user->setRoles(['ROLE_ADMIN']);

        $this->userManager->updatePassword($user);

        $manager->persist($user);
        $manager->flush();

    }
}
