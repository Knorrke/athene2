<?php
/**
 * Athene2 - Advanced Learning Resources Manager
 *
 * @author      Aeneas Rekkas (aeneas.rekkas@serlo.org)
 * @license   http://www.apache.org/licenses/LICENSE-2.0  Apache License 2.0
 * @link        https://github.com/serlo-org/athene2 for the canonical source repository
 */
namespace Normalizer\Entity;

interface NormalizedInterface
{
    /**
     * @return Metadata
     */
    public function getMetadata();

    /**
     * @return string
     */
    public function getRouteName();

    /**
     * @return array
     */
    public function getRouteParams();

    /**
     * @return string
     */
    public function getTitle();

    /**
     * @return string
     */
    public function getContent();

    /**
     * @return string
     */
    public function getType();

    /**
     * @return int
     */
    public function getId();
}
