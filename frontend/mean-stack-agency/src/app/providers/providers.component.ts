import { Component, OnInit } from '@angular/core';
import { providers } from '../models/providers.data';
import { ProviderService } from '../services/provider.service';
import { ProviderClass } from '../models/providers.class';
import { error } from 'console';
import { Router } from '@angular/router';


@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styles: ``
})
export class ProvidersComponent implements OnInit{
  providers: ProviderClass[] = [];

  constructor(private providerService: ProviderService, private router: Router) {}

  ngOnInit(): void {
    this.loadData();
  }

  navigateToDelete(providerId: number) {
    this.router.navigate(['/providers/delete', providerId]);
  }

  loadData(): void {
    this.providerService.getProviders().subscribe({
      next: (data) => {
        this.providers = data;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
