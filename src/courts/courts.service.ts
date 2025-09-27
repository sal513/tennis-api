import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { Court } from './entities/court.entity';
import { CreateCourtDto } from './dto/create-court.dto';

@Injectable()
export class CourtsService implements OnModuleInit {
  private data: Court[] = [];
  private dataPath = join(process.cwd(), 'data', 'courts.json');

  // ⚡ Chargement des données au démarrage
  async onModuleInit() {
    try {
      const raw = await readFile(this.dataPath, 'utf8');
      this.data = JSON.parse(raw) as Court[];
    } catch {
      this.data = [];
    }
  }

  // 📋 Liste résumée
  listSummary() {
    return this.data.map(({ id, name, city, imageUrl, surface, latitude, longitude, summary, favorite }) => ({
      id, name, city, imageUrl, surface, latitude, longitude, summary, favorite
    }));
  }

  // 🔎 Détail par ID
  findOne(id: string) {
    const c = this.data.find(x => x.id === id);
    if (!c) throw new NotFoundException('Court not found');
    return c;
  }

  // ➕ Création
  create(dto: CreateCourtDto) {
    if (this.data.some(x => x.id === dto.id)) {
      throw new Error('ID already exists');
    }
    const c: Court = { favorite: false, details: {}, ...dto };
    this.data.push(c);
    return c;
  }

  // ⭐ Mettre à jour le favori
  updateFavorite(id: string, favorite: boolean) {
    const c = this.findOne(id);
    c.favorite = favorite;
    return { id: c.id, favorite: c.favorite };
  }

  // 🔍 Recherche par mot-clé
  search(q: string) {
    const x = (q ?? '').toLowerCase();
    return this.listSummary().filter(
      c =>
        c.name.toLowerCase().includes(x) ||
        c.city.toLowerCase().includes(x) ||
        (c.surface ?? '').toLowerCase().includes(x) ||
        c.summary.toLowerCase().includes(x)
    );
  }
}
