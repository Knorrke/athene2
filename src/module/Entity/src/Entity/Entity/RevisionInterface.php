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
namespace Entity\Entity;

use DateTime;
use Instance\Entity\InstanceProviderInterface;
use User\Entity\UserInterface;
use Versioning\Entity\RevisionInterface as VersioningRevision;

interface RevisionInterface extends VersioningRevision, InstanceProviderInterface
{

    /**
     * Gets the date
     *
     * @return DateTime
     */
    public function getTimestamp();

    /**
     * Gets the author
     *
     * @return UserInterface
     */
    public function getAuthor();

    /**
     * Sets the date
     *
     * @param DateTime $date
     * @return self
     */
    public function setTimestamp(DateTime $date);

    /**
     * @param string $field
     * @param string $default
     * @return string
     */
    public function get($field, $default = null);

    /**
     * @param string $name
     * @param string $value
     * @return RevisionField
     */
    public function set($name, $value);

    /**
     * @return RevisionField[]
     */
    public function getFields();
}
