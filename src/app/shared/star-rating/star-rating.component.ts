import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent {
  @Input() maxStars = 5;
  @Input() initialRating = 0;

  stars: number[] = [];
  hoveredStar!: number;
  filledStars!: number;
  halfStar!: boolean;

  constructor() {
    this.fillStars();
  }

  fillStars() {
    this.stars = Array(this.maxStars).fill(0).map((_, i) => i);
    this.filledStars = Math.floor(this.initialRating);
    this.halfStar = this.initialRating % 1 === 0.5;
  }

  isFullStar(starIndex: number): boolean {
    return starIndex < this.filledStars;
  }

  isHalfStar(starIndex: number): boolean {
    return starIndex === this.filledStars && this.halfStar;
  }

  hover(starIndex: number) {
    this.hoveredStar = starIndex;
  }

  unhover() {
    this.hoveredStar = 0;
  }

  rate(rating: number) {
    if (this.halfStar && this.filledStars === rating - 1) {
      this.halfStar = false;
      this.filledStars -= 0.5;
    } else {
      this.halfStar = false;
      this.filledStars = rating;
    }
  }
}
