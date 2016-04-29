/*global define*/
define(['jquery'], function ($) {
    "use strict";
    var SingleChoice;

    SingleChoice = function () {
        return $(this).each(function () {
            var $self = $(this);
            $self.submit(function (e) {
                e.preventDefault();
                var $selected = $('.single-choice-answer-content.active', this),
                    $feedback = $selected.siblings('.single-choice-answer-feedback');

                $('.single-choice-answer-feedback', $self).hide();
                $('.single-choice-answer-content', $self).removeClass('btn-success').removeClass('btn-warning').addClass('button-default');
                $('.single-choice-submit', $self).removeClass('btn-success').removeClass('btn-warning');
                $feedback.show();
                if (Boolean($selected.attr('val'))) {
                    $selected.removeClass('button-default').addClass('btn-success');
                    $('.single-choice-submit', $self).addClass('btn-success');
                } else {
                    $selected.removeClass('button-default').addClass('btn-warning');
                    $('.single-choice-submit', $self).addClass('btn-warning');
                }
                return false;
            });
        });
    };

    $.fn.SingleChoice = SingleChoice;
});
