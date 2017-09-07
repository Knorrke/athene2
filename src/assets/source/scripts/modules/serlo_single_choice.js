/*global define*/
define(['jquery', 'sounds'], function ($, play) {
    "use strict";
    var SingleChoice;

    SingleChoice = function () {
        return $(this).each(function () {
            var $self = $(this),
                $singleChoice = $('.single-choice-group', $self);

            $('.single-choice-answer-feedback', $singleChoice).collapse({
                toggle: false
            });

            $self.click(function () {
                $self.addClass('active');
            });

            $('.single-choice-answer-content', $self).click(function (e) {
                e.preventDefault();
                $(this).addClass('active');
                $('.single-choice-answer-content', $self).not(this).removeClass('active');
            });

            $('#content-layout').click(function (event) {
                if ($self.hasClass('active') &&
                    !$(event.target).closest($self).length &&
                    !$(event.target).is($self)) {
                    $self.removeClass('active');
                    $('.active', $self).removeClass('active');
                    $('.single-choice-answer-feedback', $self).not('.positive').collapse('hide');
                }
            });

            $singleChoice.submit(function (e) {
                e.preventDefault();
                var $selected = $('.single-choice-answer-content.active', this),
                    $submit = $('.single-choice-submit', $singleChoice),
                    $feedback;

                if ($selected.length === 0) {
                    return false;
                }

                if (Boolean($selected.data('correct'))) {
                    changeClass($selected, 'button-default', 'btn-success');
                    changeClass($submit, 'btn-primary', 'btn-success');
                    $feedback = $('.single-choice-answer-feedback.positive', $singleChoice);
                    play('correct');
                } else {
                    changeClass($('.single-choice-answer-content', $self), 'btn-success', 'button-default');
                    changeClass($submit, 'btn-success', 'btn-primary');
                    changeClass($selected, 'button-default', 'btn-warning', 2000);
                    changeClass($submit, 'btn-primary', 'btn-warning', 2000);
                    $feedback = $selected.siblings('.single-choice-answer-feedback');
                    play('wrong');
                }
                $selected.removeClass('active');
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
