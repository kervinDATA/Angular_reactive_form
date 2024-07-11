import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { isRequiredValidator, rangeDateValidator } from '../models/validators';
import { MovieSearch } from '../models/movie-search.model';

@Component({
  selector: 'app-search-movie',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search-movie.component.html',
  styleUrl: './search-movie.component.css'
})
export class SearchMovieComponent {
  searchForm: FormGroup;
  formSubmitted = false;
  currentYear = new Date().getFullYear();

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      movieDetails: this.fb.group({
        identifier: [''],
        title: ['']
      }, { validators: isRequiredValidator('identifier', 'title') }),
      type: ['series'],
      year: ['', [Validators.required, rangeDateValidator(1900, this.currentYear)]],
      detail: ['']
    });

    this.searchForm.patchValue({ detail: 'short' });

    // Subscribe to value changes
    this.searchForm.valueChanges.subscribe((value: any) => {
      console.log('Form value changed:', value);
    });

    // Enable/Disable detail based on identifier value
    const identifierControl = this.searchForm.get('movieDetails.identifier');
    identifierControl?.valueChanges.subscribe((value: string) => {
      const detailControl = this.searchForm.get('detail');
      if (value && value.trim() !== '') {
        detailControl?.enable();
      } else {
        detailControl?.disable();
      }
    });
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.searchForm.valid) {
      const formValue: MovieSearch = this.searchForm.value;
      console.log('Form submitted:', formValue);
    } else {
      console.log('Form invalid:', this.searchForm.errors);
    }
  }

  get movieDetails() {
    return this.searchForm.get('movieDetails') as FormGroup;
  }
}
