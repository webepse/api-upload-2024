<?php

namespace App\Controller;

use App\Entity\Product;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\Exception\FileException;

class UploadProductController extends AbstractController
{
   public function __construct(private EntityManagerInterface $manager)
   {}

   public function __invoke(Request $request)
   {
        $data = new Product();
        $uploadedFile = $request->files->get('image');
        if(!$uploadedFile)
        {
            throw new \Exception("vous avez besoin d'ajouter un fichier");
        }else{
            $originalFilename = pathinfo($uploadedFile->getClientOriginalName(), PATHINFO_FILENAME);
            $safeFilename = transliterator_transliterate('Any-Latin; Latin-ASCII; [^A-Za-z0-9_] remove; Lower()', $originalFilename);
            $newFileName = $safeFilename.'-'.uniqid().'.'.$uploadedFile->guessExtension();
            try{
                $uploadedFile->move(
                    $this->getParameter('uploads_directory'),
                    $newFileName
                );
            }catch(FileException $e)
            {
                return $e->getMessage();
            }
            $data->setImage($newFileName);
        }
        $data->setName($request->request->get('name'));
        $data->setDescription($request->request->get('description'));
        $data->setPrice($request->request->get('price'));
        $this->manager->persist($data);
        $this->manager->flush();

        return $data;
   }
}
