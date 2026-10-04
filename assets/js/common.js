// common.js

$(document).ready(function () {
    $('.ui.sidebar').sidebar('attach events', '.toc.item');
    if ($(window).width() >= 768) {
        $('.cv-section').visibility({
            once: false,
            offset: headerHeight() + 1,
            onTopPassed: function () {
                $('.ui.following.menu .item.active').removeClass('active');
                $(`.ui.following.menu .item[href$=${$(this).attr('id')}]`).addClass('active');
            },
            onBottomPassedReverse: function () {
                $('.ui.following.menu .item.active').removeClass('active');
                $(`.ui.following.menu .item[href$=${$(this).attr('id')}]`).addClass('active');
            }
        });
    };
});

// version
dayjs.extend(dayjs_plugin_relativeTime);
function updateVersion(timestamp) {
    $('#version, .version-text').text(dayjs(timestamp).fromNow());
};
var updateAt = $('meta[name=updated_at]').attr('content');
updateVersion(updateAt);
$('#version-icon, .version-icon').addClass('green');
setInterval(function () {
    updateVersion(updateAt);
}, 15000);

$('.ui.dropdown').dropdown();

function headerHeight() {
    return $('.site-header').outerHeight() || 0;
}

if ($(window).width() >= 768) {
    $('.ui.sticky').sticky({ offset: headerHeight() + 16 });
};

// header shadow only after scrolling
function toggleHeaderShadow() {
    $('.site-header').toggleClass('scrolled', window.scrollY > 0);
}
$(window).on('scroll', toggleHeaderShadow);
toggleHeaderShadow();

// back to top (smooth unless the user prefers reduced motion)
$('.back-to-top').on('click', function () {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
});

// keyboard access for the mobile menu toggle
$('.toc.item').on('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        $(this).trigger('click');
    }
});