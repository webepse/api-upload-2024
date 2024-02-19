<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class UploadProductController extends AbstractController
{
    #[Route('/upload/product', name: 'app_upload_product')]
    public function index(): Response
    {
        return $this->render('upload_product/index.html.twig', [
            'controller_name' => 'UploadProductController',
        ]);
    }
}
