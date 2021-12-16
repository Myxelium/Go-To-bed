import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
// import { EffectsModule } from "@ngrx/effects";
import { gotobedReducer } from "./gotobed.reducer";

@NgModule({
    imports: [
        StoreModule.forFeature('Gotobed', gotobedReducer),
        // EffectsModule.forFeature([])
    ],
    providers: [],
})
export class GotobedStoreModule {}
