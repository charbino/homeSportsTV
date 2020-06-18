<?php

namespace App\Controller;

use App\Entity\Site;
use App\Form\SiteType;
use App\Repository\SiteRepository;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\EventDispatcher\EventDispatcher;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Process\Process;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\EventDispatcher\Event;

/**
 * Class SiteController
 * @package App\Controller
 */
class SiteController extends AbstractController
{
    /**
     * @Route("/", name="site_index")
     * @param Request $request
     * @param SiteRepository $repository
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function index(Request $request, SiteRepository $repository)
    {
        $form = $this->createForm(SiteType::class);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $site = $form->getData();
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($site);
            $entityManager->flush();
        }
        return $this->render('site/index.html.twig', [
            'sites' => $repository->findAll(),
            'form' => $form->createView()
        ]);
    }

    /**
     * @Route("/site/delete/{id}", name="site_delete", options = { "expose" = true })
     * @ParamConverter("site", class="App\Entity\Site")
     * @param Request $request
     * @param Site $site
     * @return JsonResponse
     */
    public function deleteSite(Request $request, Site $site)
    {
        if (!$request->isXmlHttpRequest()) {
            throw new HttpException(403, "Forbidden");
        }
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($site);
        $entityManager->flush();

        return new JsonResponse(['success' => true]);
    }

    /**
     * @Route("/site/play/{id}", name="site_play", options = { "expose" = true })
     * @ParamConverter("site", class="App\Entity\Site")
     * @param Request $request
     * @param Site $site
     * @param EventDispatcher $dispatcher
     * @return JsonResponse
     */
    public function playSite(Request $request, Site $site)
    {
        if (!$request->isXmlHttpRequest()) {
            throw new HttpException(403, "Forbidden");
        }

        $dispatcher = new EventDispatcher();
        $dispatcher->addListener(KernelEvents::TERMINATE, function (Event $event) use ($site) {
            $process = new Process(['/usr/bin/firefox', '-new-window', $site->getUrl(), '-P', 'web']);
            $process->start(null, ['DISPLAY' => ':0.0']);
        });

        return new JsonResponse(['success' => true]);
    }
}
