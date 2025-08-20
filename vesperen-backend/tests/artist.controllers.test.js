import {vi, describe, it, expect } from 'vitest';
import Artist from '../models/artist.model';
import postArtist  from '../controllers/artist.controller';



const mockPostArtist = visualViewport.fn(() => {
    describe('artist should created', () => {
        it(' use mocked value', () => {
            expect(mockPostArtist()).toBe(' data mocked');
            expect(mockPostArtist).toHaveBeenCalledTime(1);


        });
    })


});
