<?php


namespace App\Controller\Api;

use App\Entity\User;
use Exception;
use FOS\UserBundle\Model\UserManagerInterface;
use RuntimeException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\Validation;

/**
 * @Route("/api/auth")
 */
final class AuthController extends AbstractController
{
    /**
     * @Route("/register", name="auth_register",  methods={"POST"})
     * @param Request              $request
     * @param UserManagerInterface $userManager
     *
     * @return JsonResponse|RedirectResponse
     */
    public function register(Request $request, UserManagerInterface $userManager)
    {
        $data = json_decode($request->getContent(), true);
        $validator = Validation::createValidator();
        $constraint = new Assert\Collection([
            'username' => new Assert\Length(['min' => 1]),
            'password' => new Assert\Length(['min' => 1]),
            'email' => new Assert\Email(),
        ]);
        $violations = $validator->validate($data, $constraint);
        if ($violations->count() > 0) {
            return new JsonResponse(["error" => (string)$violations], 500);
        }
        $username = $data['username'];
        $password = $data['password'];
        $email = $data['email'];
        $user = new User();
        $user->setUsername($username);
        $user->setPlainPassword($password);
        $user->setEmail($email);
        $user->setEnabled(true);
        $user->setRoles(['ROLE_USER']);
        $user->setSuperAdmin(false);

        try {
            $userManager->updateUser($user);
        } catch (Exception $e) {
            return new JsonResponse(["error" => $e->getMessage()], 500);
        }

        return new JsonResponse(["success" => $user->getUsername()." has been registered!"], 200);
    }


    /**
     * @Route("/login", name="auth_login",  methods={"POST"})
     */
    public function loginAction(): JsonResponse
    {
        throw new RuntimeException('This should not be reached!');
    }


    /**
     * @throws RuntimeException
     *
     * @Route("/logout", name="auth_logout",  methods={"POST"})
     */
    public function logoutAction(): void
    {
        throw new RuntimeException('This should not be reached!');
    }
}
