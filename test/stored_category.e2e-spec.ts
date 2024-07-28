import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CategoryService } from '../src/domain/POS/stored_categories/stored_category.service';
import { AuthService } from '../src/domain/POS/auth/auth.service';
import { PosLogin } from '../src/domain/POS/auth/interface/auth.interface';

describe('StoredCategoryController', () => {
    let app: INestApplication;
    let user: PosLogin;
    let service: CategoryService;
    let authService: AuthService;
    let findId: number;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        service = app.get(CategoryService);
        authService = app.get(AuthService);

        user = await authService.login('roleowner', '1234');

        findId = (await service.findMany())[0].id;
        
    });

    it('Get all categories', async () => {
        return request(app.getHttpServer())
            .get('/pos/categories')
            .set('Authorization', 'Bearer ' + user.token)
            .expect(200)
            .expect(async (res) => {
                const categories = await service.findAll({ page: 1, limit: 0 });
                return res.body.items[0].name === categories.items[0].name;
                
            });
    });

    it('Get category by id', async () => {
        
        return request(app.getHttpServer())
            .get(`/pos/categories/${findId}`)
            .set('Authorization', 'Bearer ' + user.token)
            .expect(200)
            .expect(async (res) => {
                return res.body.id === findId;
                
            });
    });

    afterEach(async () => {
        await app.close();
    });
});
