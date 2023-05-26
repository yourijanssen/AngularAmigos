import { Component } from '@angular/core';

@Component({
    selector: 'app-sdg',
    templateUrl: './sdg.component.html',
    styleUrls: ['./sdg.component.css'],
})
export class SDGComponent {
    slideIndex = 1;

    plusSlides(n: number) {
        this.showSlides((this.slideIndex += n));
    }

    currentSlide(n: number) {
        this.showSlides((this.slideIndex = n));
    }

    showSlides(n: number) {
        let i;
        const slides = document.getElementsByClassName('mySlides');
        const dots = document.getElementsByClassName('dot');
        if (n > slides.length) {
            this.slideIndex = 1;
        }
        if (n < 1) {
            this.slideIndex = slides.length;
        }
        for (i = 0; i < slides.length; i++) {
            (slides[i] as HTMLElement).style.display = 'none';
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(' active', '');
        }
        (slides[this.slideIndex - 1] as HTMLElement).style.display = 'block';
        dots[this.slideIndex - 1].className += ' active';
    }
}
