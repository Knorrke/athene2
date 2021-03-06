<?php
/**
 * This file is part of Athene2.
 *
 * Copyright (c) 2013-2018 Serlo Education e.V.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @copyright Copyright (c) 2013-2018 Serlo Education e.V.
 * @license   http://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 * @link      https://github.com/serlo-org/athene2 for the canonical source repository
 */
namespace Log;

use Zend\EventManager\Event;
use Zend\Mvc\MvcEvent;

class Module
{
    public function getAutoloaderConfig()
    {
        $autoloader = [];

        $autoloader['Zend\Loader\StandardAutoloader'] = [
            'namespaces' => [
                __NAMESPACE__ => __DIR__ . '/src/' . __NAMESPACE__,
            ],
        ];

        if (file_exists(__DIR__ . '/autoload_classmap.php')) {
            return [
                'Zend\Loader\ClassMapAutoloader' => [
                    __DIR__ . '/autoload_classmap.php',
                ],
            ];
        }

        return $autoloader;
    }

    public function getConfig()
    {
        return include __DIR__ . '/config/module.config.php';
    }

    public function onBootstrap(MvcEvent $e)
    {
        $application    = $e->getApplication();
        $serviceLocator = $application->getServiceManager();
        $application->getEventManager()->attach(
            MvcEvent::EVENT_DISPATCH_ERROR,
            function (Event $e) use ($serviceLocator) {
                $exception = $e->getParam('exception');
                $serviceLocator->get('Zend\Log\Logger')->crit($exception);
            }
        );
        $application->getEventManager()->attach(
            MvcEvent::EVENT_RENDER_ERROR,
            function (Event $e) use ($serviceLocator) {
                $exception = $e->getParam('exception');
                $serviceLocator->get('Zend\Log\Logger')->crit($exception);
            }
        );

        // Init sentry
        $serviceLocator->get('Log\Sentry');
    }
}
