import { Component, OnInit } from '@angular/core';
import { ProviderClass } from '../../models/providers.class';
import { ActivatedRoute } from '@angular/router';
import { ProviderService } from '../../services/provider.service';

@Component({
  selector: 'app-details-providers',
  templateUrl: './details-providers.component.html',
  styles: ``
})
export class DetailsProvidersComponent implements OnInit{
  company = new ProviderClass();
  id!: number; //Service provider's id from URL
  ready = false;

  constructor(private providerService: ProviderService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.route.paramMap.subscribe(params => {
      this.id = parseInt(params.get('id')!, 10);

      this.providerService.getProvider(this.id).subscribe({
        next: (data) => {
          this.company = data[0];
          console.log(data);
          this.ready = true;
        },
        error: (error) => {
          console.log(error);
        }
      });
    });
  }
}
