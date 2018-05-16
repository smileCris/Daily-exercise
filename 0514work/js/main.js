$(function () {
    var a = new Array('url(image/pic-1.jpg)', 'url(image/pic-2.jpg)', 'url(image/pic-3.jpg)');
    var i = 0;
    function displayImg() {
        if (i < 3) {
            i++;
            $('.img').css('background-image', a[i]).fadeToggle(2000);
        } else {
            i = 0;
            $('.img').css('background-image', a[i]).fadeToggle(2000);
        }
    }
    setInterval(displayImg, 2000);
    $('#button').click(function(){
        $('.span').css('display','inline').html('加购了' + $('#num').val() + '件商品，需花￥' + $('#num').val()*195);
        console.log($('#num').val());
    })
})