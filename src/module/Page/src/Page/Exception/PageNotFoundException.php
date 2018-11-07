<?php
/**
 * Athene2 - Advanced Learning Resources Manager
 *
 * @author      Aeneas Rekkas (aeneas.rekkas@serlo.org)
 * @license   http://www.apache.org/licenses/LICENSE-2.0  Apache License 2.0
 * @link        https://github.com/serlo-org/athene2 for the canonical source repository
 */
namespace Page\Exception;

class PageNotFoundException extends RuntimeException
{
    public function __construct($page)
    {
        parent::__construct("Page `{$page}` not found.");
    }
}
