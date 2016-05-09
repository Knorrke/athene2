/*global define, MathJax*/
define(['jquery'], function ($) {
    "use strict";
    var SingleChoice;

    SingleChoice = function () {

        function checkHeights($self) {
            var totalWidth = 0,
                changed = false;

            $('.single-choice-answer-content', $self).each(function () {
                if ($(this).height() > 35) {
                    if (!$self.hasClass('extended')) {
                        changed = true;
                        $self.addClass('extended');
                    }
                    return false;
                }
                totalWidth += $(this).width();
            });

            if (totalWidth > $self.width()) {
                if (!$self.hasClass('extended')) {
                    changed = true;
                    $self.addClass('extended');
                }
            }

            return changed;
        }

        function handleResize($self) {
            MathJax.Hub.Queue(function () {
                if (checkHeights($self)) {
                    MathJax.Hub.Queue(['Reprocess', MathJax.Hub]);
                }
            });
        }

        return $(this).each(function () {
            var $self = $(this);

            handleResize($self);

            $(window).bind('resizeDelay', function () {
                handleResize($self);
            });

            $self.click(function () {
                $('.single-choice-group').removeClass('active');
                $self.addClass('active');
            });

            $self.submit(function (e) {
                e.preventDefault();
                var $selected = $('.single-choice-answer-content.active', this),
                    $submit = $('.single-choice-submit', $self),
                    $feedback;

                if ($self.hasClass('extended')) {
                    $('.single-choice-answer-feedback', $self).hide();
                } else {
                    $('.single-choice-answer-feedback', $self).css('visibility', 'hidden');
                }

                $('.single-choice-answer-content', $self).removeClass('btn-success btn-warning').addClass('button-default');
                $submit.removeClass('btn-success btn-warning');


                if (Boolean($selected.attr('val'))) {
                    $selected.removeClass('button-default').addClass('btn-success');
                    $submit.removeClass('btn-primary').addClass('btn-success');

                    $feedback = $('.single-choice-answer-feedback.positive', $self);
                } else {
                    $selected.removeClass('button-default').addClass('btn-warning');
                    setTimeout(function () {
                        $selected.removeClass('btn-warning').addClass('button-default');
                    }, 1000);

                    $submit.removeClass('btn-primary').addClass('btn-warning');
                    setTimeout(function () {
                        $submit.removeClass('btn-warning').addClass('btn-primary');
                    }, 1000);

                    $feedback = $selected.siblings('.single-choice-answer-feedback');
                }

                $feedback.show();
                $feedback.css('visibility', 'visible');
                return false;
            });
        });
    };

    $.fn.SingleChoice = SingleChoice;
});
