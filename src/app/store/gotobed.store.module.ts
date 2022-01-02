import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { gotobedReducer } from './gotobed.reducer';
import { GotobedEffects } from './gotoved.effects';

@NgModule({
    imports: [
        StoreModule.forFeature('Gotobed', gotobedReducer),
        EffectsModule.forFeature([GotobedEffects])
    ],
    providers: [],
})
export class GotobedStoreModule {}
