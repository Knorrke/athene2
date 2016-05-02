/*global define*/
define(['jquery'], function ($) {
    "use strict";
    var SingleChoice;

    SingleChoice = function () {

        return $(this).each(function () {
            var $self = $(this);

            $self.click(function () {
                $self.addClass('active');
            });

            $self.submit(function (e) {
                e.preventDefault();
                var $selected = $('.single-choice-answer-content.active', this),
                    $submit = $('.single-choice-submit', $self),
                    $feedback;

                $('.single-choice-answer-feedback', $self).css('visibility', 'hidden');

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
                $feedback.css('visibility', 'visible');
                return false;
            });
        });
    };

    $.fn.SingleChoice = SingleChoice;
});
