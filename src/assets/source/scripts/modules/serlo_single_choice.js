/*global define, MathJax*/
define(['jquery'], function ($) {
    "use strict";
    var SingleChoice;

    SingleChoice = function () {

        function checkDimensions($self) {
            var totalWidth = 0,
                changed = false;

            $('.single-choice-answer-content', $self).each(function () {
                totalWidth += $(this).width();
                if (totalWidth > $self.width() || $(this).height() > 35) {
                    changed = true;
                    $self.addClass('extended');
                    return false;
                }
            });

            return changed;
        }

        function handleResize($self) {
            if (!$self.hasClass('extended')) {
                MathJax.Hub.Queue(function () {
                    if (checkDimensions($self)) {
                        MathJax.Hub.Queue(['Typeset', MathJax.Hub, $self.get(0)]);
                    }
                });
            }
        }

        return $(this).each(function () {
            var $self = $(this),
                $singleChoice = $('.single-choice-group', $self);

            handleResize($self);
            $(window).bind('resizeDelay', function () {
                handleResize($self);
            });

            $('.single-choice-answer-feedback', $singleChoice).collapse({
                toggle: false
            });

            function clearState($excercise) {
                $excercise.removeClass('active');
                $('.active', $excercise).removeClass('active');
                $('.single-choice-answer-feedback', $excercise).not('.positive').collapse('hide');
            }
            function setActive() {
                $('.excercise').not($self).each(function () {
                    clearState($(this));
                });
                $self.addClass('active');
            }

            $self.focusin(setActive);
            $self.click(setActive);
            $self.focusout(function () {
                clearState($self);
            });

            $singleChoice.submit(function (e) {
                e.preventDefault();
                var $selected = $('.single-choice-answer-content.active', this),
                    $submit = $('.single-choice-submit', $singleChoice),
                    $feedback;

                if ($submit.hasClass('btn-success')) {
                    return false;
                }

                if (Boolean($selected.attr('val'))) {
                    changeClass($selected, 'button-default', 'btn-success');
                    changeClass($submit, 'btn-primary', 'btn-success');
                    $('.single-choice-answer-content', $self).not('.active').addClass('disabled');
                    $feedback = $('.single-choice-answer-feedback.positive', $singleChoice);
                } else {
                    changeClass($selected, 'button-default', 'btn-warning', 2000);
                    changeClass($submit, 'btn-primary', 'btn-warning', 2000);
                    $feedback = $selected.siblings('.single-choice-answer-feedback');
                }

                $('.single-choice-answer-feedback', $singleChoice).not($feedback).collapse('hide');
                $feedback.collapse('show');
                return false;
            });
        });


        function changeClass($element, oldClasses, newClasses, time) {
            $element.removeClass(oldClasses).addClass(newClasses);
            if (time) {
                setTimeout(function () {
                    $element.removeClass(newClasses).addClass(oldClasses);
                }, time);
            }
        }
    };

    $.fn.SingleChoice = SingleChoice;
});
