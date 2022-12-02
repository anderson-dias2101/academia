import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  novaAtividade = '';
  atividades: string[] = [];
  atividadesBackup: string[] = [];
  novoPeso: '';
  peso: string[] = [];


  constructor(
    private storage: Storage,
    private toast: ToastController
  ) {
    this.iniciarBanco();
  }

  async desfazer(atividadeExcluida) {
    const t = await this.toast.create({
      message: 'Você excluiu ' + atividadeExcluida,
      duration: 3000,
      color: 'dark',
      buttons: [
        {
          text: 'Desfazer',
          handler: async () => {
            this.atividades = [...this.atividadesBackup];
            await this.storage.set('atividades', this.atividades);

          }
        }
      ]
    });
    t.present();
  }

  async iniciarBanco() {
    await this.storage.create();
    this.atividades = await this.storage.get('atividades') ?? [];
    this.novoPeso = await this.storage.get('novoPeso') ?? [];
  }

  async apagarAtividade(indice) {
    this.desfazer(this.atividades[indice]);
    this.atividadesBackup = [...this.atividades];
    this.atividades.splice(indice, 1);
    await this.storage.set('atividades', this.atividades);
  }

  async adicionarAtividade() {
    this.atividades.push(this.novaAtividade);
    this.novaAtividade = '';
    await this.storage.set('atividades', this.atividades);
  }

  async adicionarPeso() {
    this.peso.push(this.novoPeso);
    this.novoPeso = '';
    await this.storage.set('Peso', this.peso);
  }
}
