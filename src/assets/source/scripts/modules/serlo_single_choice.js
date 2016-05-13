/*global define, MathJax*/
define(['jquery'], function ($) {
    "use strict";
    var SingleChoice;

    SingleChoice = function () {

        function checkHeights($singleChoice) {
            var totalWidth = 0,
                changed = false;

            $('.single-choice-answer-content', $singleChoice).each(function () {
                if ($singleChoice.hasClass('extended')) return false;

                if ($(this).height() > 35) {
                    changed = true;
                    $singleChoice.addClass('extended');
                    return false;
                }
                totalWidth += $(this).width();
            });

            if (totalWidth > $singleChoice.width()) {
                changed = true;
                $singleChoice.addClass('extended');
            }

            return changed;
        }

        function handleResize($singleChoice) {
            MathJax.Hub.Queue(function () {
                if (checkHeights($singleChoice)) {
                    MathJax.Hub.Queue(['Reprocess', MathJax.Hub]);
                }
            });
        }

        return $(this).each(function () {
            var $self = $(this),
                $singleChoice = $('.single-choice-group', $self);

            handleResize($singleChoice);
            $(window).bind('resizeDelay', function () {
                handleResize($singleChoice);
            });

            $('.single-choice-answer-feedback', $singleChoice).collapse({
                toggle: false
            });

            function setActive() {
                $('.single-choice-group').removeClass('active');
                $singleChoice.addClass('active');
            }
            $self.focusin(setActive);
            $self.click(setActive);
            $self.focusout(setActive);


            $singleChoice.submit(function (e) {
                e.preventDefault();
                var $selected = $('.single-choice-answer-content.active', this),
                    $submit = $('.single-choice-submit', $singleChoice),
                    $feedback;

                $('.single-choice-answer-feedback', $singleChoice).collapse('hide');
                $('.single-choice-answer-content', $singleChoice).removeClass('btn-success btn-warning').addClass('button-default');
                $submit.removeClass('btn-success btn-warning');


                if (Boolean($selected.attr('val'))) {
                    $selected.removeClass('button-default').addClass('btn-success');
                    $submit.removeClass('btn-primary').addClass('btn-success');

                    $feedback = $('.single-choice-answer-feedback.positive', $singleChoice);
                } else {
                    $selected.removeClass('button-default').addClass('btn-warning');
                    setTimeout(function () {
                        $selected.removeClass('btn-warning').addClass('button-default');
                    }, 1500);

                    $submit.removeClass('btn-primary').addClass('btn-warning');
                    setTimeout(function () {
                        $submit.removeClass('btn-warning').addClass('btn-primary');
                    }, 1500);

                    $feedback = $selected.siblings('.single-choice-answer-feedback');
                }

                $feedback.collapse('show');
                return false;
            });
        });
    };

    $.fn.SingleChoice = SingleChoice;
});
