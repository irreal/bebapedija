import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';

import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

describe('DataService', () => {

  let httpTestingController: HttpTestingController;
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataService],
      imports: [HttpClientTestingModule]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(DataService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an observable of facts', () => {
    const mockFact = {
      range: 'data!A1:Z999',
      majorDimension: 'ROWS',
      values: [
        [
          'Kategorija',
          'Akcija',
          'Korak 1',
          'Korak 2',
          'Korak 3',
          'Korak 4',
          'Korak 5',
          'Korak 6',
          'Korak 7',
          'Korak 8',
          'Korak 9',
          'Korak 10',
          'ToDo?'
        ],
        [
          'Category',
          'Action'
        ]
      ]
    };

    service.getFacts()
      .subscribe(factsData => {
        expect(factsData.length).toEqual(1);
        expect(factsData[0].Action).toEqual('Action');
      });

    const req = httpTestingController.expectOne(
      'https://sheets.googleapis.com/v4/spreadsheets/13YchDltJ_ckx2A3IGocV9RClHT_KuPxmVluBIxG3FkM/values/data');

    expect(req.request.method).toEqual('GET');

    req.flush([mockFact]);
  });
});
