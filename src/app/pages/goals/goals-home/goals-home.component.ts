import { Component } from '@angular/core';

@Component({
  selector: 'app-goals-home',
  templateUrl: './goals-home.component.html',
  styleUrl: './goals-home.component.scss'
})
export class GoalsHomeComponent {
  shareGoal(): void {
    const shareData = {
      title: 'Minhas Metas',
      text: 'Confira minhas metas!',
      url: 'https://meuapp.com/minhas-metas',
    };

    if (navigator.share) {
      navigator.share(shareData).catch((err) =>
        console.error('Erro ao compartilhar:', err)
      );
    } else {
      console.log('API de compartilhamento não disponível.');
    }
  }


}
