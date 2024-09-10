import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../../services/provider.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete-providers',
  templateUrl: './delete-providers.component.html',
  styles: ``
})
export class DeleteProvidersComponent implements OnInit {
  id!: number;
  company_name!: string;
  isDeleted = false;

  constructor(
    private route: ActivatedRoute,
    private providerService: ProviderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.deleteRecord();
  }

  deleteRecord() {
    this.providerService.deleteProvider(this.id)
      .subscribe({
        next: (data) => {
          this.company_name = data.company.company_name;
          this.isDeleted = true;
          // Aquí, puedes quedarte en la misma página o redirigir a otra página después de un tiempo
          setTimeout(() => {
            this.router.navigate(['/providers']);
          },3000)
        },
        error: (error) => {
          console.error('Error deleting provider:', error);
          // Manejo de errores, redirigir a una página de error si es necesario
        }
      });
  }
}
