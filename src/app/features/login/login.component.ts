import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <div class="login-page">
      <div class="login-card">

        <div class="login-header">
          <div class="logo">TMS</div>
          <h1>Welcome Back</h1>
          <p>Sign in to your Training Management System</p>
        </div>

        <form #loginForm="ngForm" (ngSubmit)="login()">

          <!-- Email -->
          <div class="form-group">
            <label for="email">Email address</label>

            <input
              id="email"
              type="email"
              name="email"
              [(ngModel)]="email"
              #emailInput="ngModel"
              required
              email
              placeholder="you@example.com"
              autocomplete="email"
              [class.invalid]="emailInput.invalid && emailInput.touched"
            />

            @if (emailInput.invalid && emailInput.touched) {
              <div class="field-error">
                @if (emailInput.errors?.['required']) {
                  <span>Email is required.</span>
                }

                @if (emailInput.errors?.['email']) {
                  <span>Please enter a valid email address.</span>
                }
              </div>
            }
          </div>

          <!-- Password -->
          <div class="form-group">
            <div class="label-row">
              <label for="password">Password</label>
            </div>

            <input
              id="password"
              [type]="showPassword ? 'text' : 'password'"
              name="password"
              [(ngModel)]="password"
              #passwordInput="ngModel"
              required
              minlength="12"
              placeholder="Enter your password"
              autocomplete="current-password"
              [class.invalid]="passwordInput.invalid && passwordInput.touched"
            />

            <button
              type="button"
              class="show-password"
              (click)="togglePassword()"
            >
              {{ showPassword ? 'Hide' : 'Show' }}
            </button>

            @if (passwordInput.invalid && passwordInput.touched) {
              <div class="field-error">
                @if (passwordInput.errors?.['required']) {
                  <span>Password is required.</span>
                }

                @if (passwordInput.errors?.['minlength']) {
                  <span>Password must be at least 12 characters.</span>
                }
              </div>
            }
          </div>

          <!-- Server error -->
          @if (errorMessage) {
            <div class="error-box">
              {{ errorMessage }}
            </div>
          }

          <!-- Submit -->
          <button
            type="submit"
            class="login-button"
            [disabled]="loginForm.invalid || isLoading"
          >
            @if (isLoading) {
              <span class="spinner"></span>
              Signing in...
            } @else {
              Sign In
            }
          </button>
        </form>

        <div class="divider">
          <span>OR</span>
        </div>

        <div class="register-link">
          <span>Don't have an account?</span>
          <a routerLink="/register">Create an account</a>
        </div>

      </div>
    </div>
  `,
  styles: [`
    * {
      box-sizing: border-box;
    }

    .login-page {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      background:
        radial-gradient(
          circle at top left,
          rgba(59, 130, 246, 0.15),
          transparent 35%
        ),
        #f5f7fb;
    }

    .login-card {
      width: 100%;
      max-width: 430px;
      padding: 40px;
      background: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 18px;
      box-shadow:
        0 20px 50px rgba(15, 23, 42, 0.10);
    }

    .login-header {
      text-align: center;
      margin-bottom: 32px;
    }

    .logo {
      width: 58px;
      height: 58px;
      margin: 0 auto 18px;

      display: flex;
      align-items: center;
      justify-content: center;

      border-radius: 14px;
      background: #111827;
      color: #ffffff;

      font-size: 18px;
      font-weight: 700;
      letter-spacing: 1px;
    }

    .login-header h1 {
      margin: 0 0 8px;
      font-size: 30px;
      font-weight: 700;
      color: #111827;
    }

    .login-header p {
      margin: 0;
      color: #6b7280;
      font-size: 14px;
      line-height: 1.5;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 22px;
    }

    .form-group {
      position: relative;
    }

    .form-group label {
      display: block;
      margin-bottom: 8px;
      color: #374151;
      font-size: 14px;
      font-weight: 600;
    }

    input {
      width: 100%;
      height: 50px;
      padding: 0 15px;

      border: 1px solid #d1d5db;
      border-radius: 10px;

      background: #ffffff;
      color: #111827;
      font-size: 15px;

      outline: none;
      transition:
        border-color 0.2s ease,
        box-shadow 0.2s ease;
    }

    input::placeholder {
      color: #9ca3af;
    }

    input:focus {
      border-color: #2563eb;
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.10);
    }

    input.invalid {
      border-color: #dc2626;
    }

    input.invalid:focus {
      box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.10);
    }

    .field-error {
      margin-top: 6px;
      color: #dc2626;
      font-size: 12px;
      line-height: 1.4;
    }

    .show-password {
      position: absolute;
      right: 10px;
      bottom: 9px;

      border: none;
      background: transparent;

      color: #2563eb;
      font-size: 12px;
      font-weight: 600;

      cursor: pointer;
    }

    .show-password:hover {
      color: #1d4ed8;
    }

    .error-box {
      padding: 12px 14px;
      border-radius: 10px;

      background: #fef2f2;
      border: 1px solid #fecaca;
      color: #b91c1c;

      font-size: 13px;
      line-height: 1.5;
    }

    .login-button {
      width: 100%;
      height: 50px;

      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;

      border: none;
      border-radius: 10px;

      background: #111827;
      color: #ffffff;

      font-size: 15px;
      font-weight: 600;

      cursor: pointer;
      transition:
        transform 0.15s ease,
        background 0.2s ease,
        opacity 0.2s ease;
    }

    .login-button:hover:not(:disabled) {
      background: #1f2937;
      transform: translateY(-1px);
    }

    .login-button:disabled {
      opacity: 0.55;
      cursor: not-allowed;
    }

    .spinner {
      width: 16px;
      height: 16px;

      border: 2px solid rgba(255, 255, 255, 0.35);
      border-top-color: #ffffff;
      border-radius: 50%;

      animation: spin 0.7s linear infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    .divider {
      display: flex;
      align-items: center;
      gap: 12px;
      margin: 28px 0 20px;
      color: #9ca3af;
      font-size: 11px;
      font-weight: 600;
    }

    .divider::before,
    .divider::after {
      content: '';
      flex: 1;
      height: 1px;
      background: #e5e7eb;
    }

    .register-link {
      text-align: center;
      color: #6b7280;
      font-size: 14px;
    }

    .register-link a {
      margin-left: 5px;
      color: #2563eb;
      text-decoration: none;
      font-weight: 600;
    }

    .register-link a:hover {
      text-decoration: underline;
    }

    @media (max-width: 480px) {
      .login-page {
        padding: 16px;
      }

      .login-card {
        padding: 28px 22px;
      }

      .login-header h1 {
        font-size: 26px;
      }
    }
  `]
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';

  errorMessage = '';
  isLoading = false;
  showPassword = false;

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  async login(): Promise<void> {
    if (this.isLoading) {
      return;
    }

    this.errorMessage = '';
    this.isLoading = true;

    try {
      await this.authService.login({
        email: this.email,
        password: this.password,
      });

      const role = this.authService.currentUser()?.role;

      console.log('Logged in role:', role);

      if (role === 'Admin') {
        await this.router.navigate(['/admin/courses']);
      } else if (role === 'Instructor') {
        await this.router.navigate(['/instructor-dashboard']);
      } else {
        await this.router.navigate(['/dashboard']);
      }

    } catch (error: any) {
      console.error('Login failed:', error);

      if (error?.status === 401) {
        this.errorMessage = 'Invalid email or password.';
      } else if (error?.status === 423) {
        this.errorMessage =
          'Your account is locked due to multiple failed login attempts.';
      } else if (error?.status === 429) {
        this.errorMessage =
          'Too many login attempts. Please wait one minute and try again.';
      } else {
        this.errorMessage =
          'Unable to sign in. Please check your connection and try again.';
      }
    } finally {
      this.isLoading = false;
    }
  }
}