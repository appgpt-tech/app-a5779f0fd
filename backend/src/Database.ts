//Source code generated by AppGPT (www.appgpt.tech)

//Class to create tables and seed new database
import { DataSource } from 'typeorm';
import { DBConfiguration } from './Configuration';
import { SettingsEntity } from './db/Settings.entity';
//autogenerate imports based on resources
import { ChannelsEntity } from './db/Channels.entity';

export class Database {
  static dbConfiguration: DBConfiguration;
  public static ds: DataSource;

  static async Initialize(dbConfiguration: DBConfiguration) {
    Database.dbConfiguration = dbConfiguration;
    let dbConfig: any = dbConfiguration as any;
    //Autogenerate entities array from resource names

    dbConfig.entities = [SettingsEntity, ChannelsEntity];
    Database.ds = new DataSource(dbConfig);
    await Database.ds.initialize();

    //TODO: Drop all tables

    await Database.Seed();
  }
  static async Seed() {
    let data: any = {
      Channels: [
        {
          channelName: 'channelName 1',
          streamURL: 'streamURL 1',
          description: 'description 1',
          genre: 'genre 1',
          id: 76,
        },
        {
          channelName: 'channelName 2',
          streamURL: 'streamURL 2',
          description: 'description 2',
          genre: 'genre 2',
          id: 40,
        },
        {
          channelName: 'channelName 3',
          streamURL: 'streamURL 3',
          description: 'description 3',
          genre: 'genre 3',
          id: 25,
        },
        {
          channelName: 'channelName 4',
          streamURL: 'streamURL 4',
          description: 'description 4',
          genre: 'genre 4',
          id: 83,
        },
        {
          channelName: 'channelName 5',
          streamURL: 'streamURL 5',
          description: 'description 5',
          genre: 'genre 5',
          id: 95,
        },
      ],
    };
    //Autogenerate multiple such calls ie for each resource and its data object
    let isSeeded = await this.IsSeeded();
    //if (!isSeeded) {
    //forcing app recreation
    if (true) {
      console.log('   Seeding database...');
      await this.SeedResource('ChannelsEntity', data.Channels);
      await this.SeedResource('SettingsEntity', {
        settingname: 'isSeeded',
        settingvalue: 'true',
      });
    } else {
      console.log('   Database seeded already!');
    }
  }
  static async IsSeeded() {
    const repo = Database.ds.getRepository('SettingsEntity');
    let rec: any = await repo.findOne({
      select: {
        settingname: true,
        settingvalue: true,
      },
      where: {
        settingname: 'isSeeded',
      },
    });
    if (rec && rec.settingvalue) return true;
    return false;
  }
  static async SeedResource(resourceName: any, resourceData: any) {
    const repo = Database.ds.getRepository(resourceName);
    //await repo.clear();
    console.log('   Seeding table ' + resourceName);
    await repo.upsert(resourceData, ['id']);
  }
}
