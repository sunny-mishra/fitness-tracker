import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { WelcomeComponent } from "./welcome/welcome.component";
import { AuthGuard } from "./auth/auth.guard";
// auth.guard behind the scenes is treated as a service which means Angular injects it.
// Even though we don't inject it. For this to work, we need to "provide" it.
// You should normally provide in the app.module or the component but "guards" is
// fine to be provided in the router.module because we only use it here.

const routes: Routes = [
  { path: "", component: WelcomeComponent },
  {
    path: "training",
    loadChildren: "./training/training.module#TrainingModule",
    canLoad: [AuthGuard] // Works like 'canActivate' but runs before the bundle is loaded
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
