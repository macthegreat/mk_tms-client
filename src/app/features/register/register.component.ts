import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <div class="register-page">
      <div class="register-card">

        <div class="register-header">
          <div class="logo">TMS</div>

          <h1>Create Account</h1>

          <p>
            Create your Training Management System account
          </p>
        </div>

        <form
          #registerForm="ngForm"
          (ngSubmit)="register()"
          novalidate
        >

          <!-- First Name -->
          <div class="form-group">
            <label for="firstName">First name</label>

            <input
              id="firstName"
              type="text"
              name="firstName"
              [(ngModel)]="firstName"
              #firstNameInput="ngModel"
              required
              minlength="2"
              maxlength="50"
              placeholder="Enter your first name"
              autocomplete="given-name"
              [class.invalid]="
                firstNameInput.invalid &&
                firstNameInput.touched
              "
            />

            @if (
              firstNameInput.invalid &&
              firstNameInput.touched
            ) {
              <div class="field-error">
                @if (firstNameInput.errors?.['required']) {
                  <span>First name is required.</span>
                }

                @if (firstNameInput.errors?.['minlength']) {
                  <span>
                    First name must be at least 2 characters.
                  </span>
                }
              </div>
            }
          </div>

          <!-- Last Name -->
          <div class="form-group">
            <label for="lastName">Last name</label>

            <input
              id="lastName"
              type="text"
              name="lastName"
              [(ngModel)]="lastName"
              #lastNameInput="ngModel"
              required
              minlength="2"
              maxlength="50"
              placeholder="Enter your last name"
              autocomplete="family-name"
              [class.invalid]="
                lastNameInput.invalid &&
                lastNameInput.touched
              "
            />

            @if (
              lastNameInput.invalid &&
              lastNameInput.touched
            ) {
              <div class="field-error">
                @if (lastNameInput.errors?.['required']) {
                  <span>Last name is required.</span>
                }

                @if (lastNameInput.errors?.['minlength']) {
                  <span>
                    Last name must be at least 2 characters.
                  </span>
                }
              </div>
            }
          </div>

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
              [class.invalid]="
                emailInput.invalid &&
                emailInput.touched
              "
            />

            @if (
              emailInput.invalid &&
              emailInput.touched
            ) {
              <div class="field-error">
                @if (emailInput.errors?.['required']) {
                  <span>Email is required.</span>
                }

                @if (emailInput.errors?.['email']) {
                  <span>
                    Please enter a valid email address.
                  </span>
                }
              </div>
            }
          </div>

          <!-- Password -->
          <div class="form-group">
            <label for="password">Password</label>

            <div class="password-wrapper">
              <input
                id="password"
                [type]="showPassword ? 'text' : 'password'"
                name="password"
                [(ngModel)]="password"
                #passwordInput="ngModel"
                required
                minlength="12"
                placeholder="Create a strong password"
                autocomplete="new-password"
                [class.invalid]="
                  passwordInput.invalid &&
                  passwordInput.touched
                "
              />

              <button
                type="button"
                class="show-password"
                (click)="togglePassword()"
              >
                {{ showPassword ? 'Hide' : 'Show' }}
              </button>
            </div>

            <div class="password-help">
              Password must contain:
              <ul>
                <li
                  [class.valid]="password.length >= 12"
                >
                  At least 12 characters
                </li>

                <li
                  [class.valid]="hasUppercase"
                >
                  One uppercase letter
                </li>

                <li
                  [class.valid]="hasNumber"
                >
                  One number
                </li>

                <li
                  [class.valid]="hasSpecialCharacter"
                >
                  One special character
                </li>
              </ul>
            </div>

            @if (
              passwordInput.invalid &&
              passwordInput.touched
            ) {
              <div class="field-error">
                @if (passwordInput.errors?.['required']) {
                  <span>Password is required.</span>
                }

                @if (passwordInput.errors?.['minlength']) {
                  <span>
                    Password must be at least 12 characters.
                  </span>
                }
              </div>
            }
          </div>

          <!-- Role -->
          <div class="form-group">
            <label for="role">Account type</label>

            <select
              id="role"
              name="role"
              [(ngModel)]="role"
              required
            >
              <option value="Student">Student</option>
              <option value="Instructor">Instructor</option>
            </select>
          </div>

          <!-- Backend errors -->
          @if (serverErrors.length > 0) {
            <div class="error-box">
              <strong>Registration failed</strong>

              <ul>
                @for (error of serverErrors; track error) {
                  <li>{{ error }}</li>
                }
              </ul>
            </div>
          }

          <!-- Success -->
          @if (successMessage) {
            <div class="success-box">
              {{ successMessage }}
            </div>
          }

          <!-- Submit -->
          <button
            type="submit"
            class="register-button"
            [disabled]="
              registerForm.invalid ||
              isLoading ||
              !passwordMeetsPolicy
            "
          >
            @if (isLoading) {
              <span class="spinner"></span>
              Creating account...
            } @else {
              Create Account
            }
          </button>

        </form>

        <div class="divider">
          <span>OR</span>
        </div>

        <div class="login-link">
          <span>Already have an account?</span>

          <a routerLink="/login">
            Sign in
          </a>
        </div>

      </div>
    </div>
  `,

  styles: [`
    * {
      box-sizing: border-box;
    }

    .register-page {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 24px;

      background:
        radial-gradient(
          circle at top right,
          rgba(59, 130, 246, 0.14),
          transparent 35%
        ),
        #f5f7fb;
    }

    .register-card {
      width: 100%;
      max-width: 480px;

      padding: 40px;

      background: #ffffff;

      border: 1px solid #e5e7eb;
      border-radius: 18px;

      box-shadow:
        0 20px 50px rgba(15, 23, 42, 0.10);
    }

    .register-header {
      text-align: center;
      margin-bottom: 30px;
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

    .register-header h1 {
      margin: 0 0 8px;

      color: #111827;

      font-size: 30px;
      font-weight: 700;
    }

    .register-header p {
      margin: 0;

      color: #6b7280;

      font-size: 14px;
      line-height: 1.5;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .form-group {
      position: relative;
    }

    .form-group > label {
      display: block;

      margin-bottom: 8px;

      color: #374151;

      font-size: 14px;
      font-weight: 600;
    }

    input,
    select {
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

    input:focus,
    select:focus {
      border-color: #2563eb;

      box-shadow:
        0 0 0 3px rgba(37, 99, 235, 0.10);
    }

    input.invalid {
      border-color: #dc2626;
    }

    select {
      cursor: pointer;
    }

    .field-error {
      display: flex;
      flex-direction: column;
      gap: 3px;

      margin-top: 6px;

      color: #dc2626;
      font-size: 12px;
      line-height: 1.4;
    }

    .password-wrapper {
      position: relative;
    }

    .password-wrapper input {
      padding-right: 70px;
    }

    .show-password {
      position: absolute;

      right: 10px;
      top: 50%;
      transform: translateY(-50%);

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

    .password-help {
      margin-top: 8px;

      color: #6b7280;

      font-size: 12px;
      line-height: 1.5;
    }

    .password-help ul {
      margin: 4px 0 0;
      padding-left: 18px;
    }

    .password-help li {
      margin: 2px 0;
    }

    .password-help li.valid {
      color: #15803d;
    }

    .error-box {
      padding: 14px;

      border: 1px solid #fecaca;
      border-radius: 10px;

      background: #fef2f2;
      color: #b91c1c;

      font-size: 13px;
      line-height: 1.5;
    }

    .error-box strong {
      display: block;
      margin-bottom: 6px;
    }

    .error-box ul {
      margin: 0;
      padding-left: 18px;
    }

    .success-box {
      padding: 12px 14px;

      border: 1px solid #bbf7d0;
      border-radius: 10px;

      background: #f0fdf4;
      color: #166534;

      font-size: 13px;
      line-height: 1.5;
    }

    .register-button {
      width: 100%;
      height: 50px;

      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;

      margin-top: 4px;

      border: none;
      border-radius: 10px;

      background: #111827;
      color: #ffffff;

      font-size: 15px;
      font-weight: 600;

      cursor: pointer;

      transition:
        background 0.2s ease,
        transform 0.15s ease,
        opacity 0.2s ease;
    }

    .register-button:hover:not(:disabled) {
      background: #1f2937;
      transform: translateY(-1px);
    }

    .register-button:disabled {
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

      margin: 26px 0 18px;

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

    .login-link {
      text-align: center;

      color: #6b7280;

      font-size: 14px;
    }

    .login-link a {
      margin-left: 5px;

      color: #2563eb;

      text-decoration: none;

      font-weight: 600;
    }

    .login-link a:hover {
      text-decoration: underline;
    }

    @media (max-width: 480px) {
      .register-page {
        padding: 16px;
      }

      .register-card {
        padding: 28px 22px;
      }

      .register-header h1 {
        font-size: 26px;
      }
    }
  `]
})
export class RegisterComponent {
  private http = inject(HttpClient);
  private router = inject(Router);

  firstName = '';
  lastName = '';
  email = '';
  password = '';
  role = 'Student';

  serverErrors: string[] = [];
  successMessage = '';

  isLoading = false;
  showPassword = false;

  get hasUppercase(): boolean {
    return /[A-Z]/.test(this.password);
  }

  get hasNumber(): boolean {
    return /\d/.test(this.password);
  }

  get hasSpecialCharacter(): boolean {
    return /[^A-Za-z0-9]/.test(this.password);
  }

  get passwordMeetsPolicy(): boolean {
    return (
      this.password.length >= 12 &&
      this.hasUppercase &&
      this.hasNumber &&
      this.hasSpecialCharacter
    );
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  async register(): Promise<void> {
    if (this.isLoading) {
      return;
    }

    this.serverErrors = [];
    this.successMessage = '';
    this.isLoading = true;

    const request: RegisterRequest = {
      email: this.email.trim(),
      password: this.password,
      firstName: this.firstName.trim(),
      lastName: this.lastName.trim(),
      role: this.role,
    };

    try {
      await firstValueFrom(
        this.http.post(
          '/api/auth/register',
          request
        )
      );

      this.successMessage =
        'Registration successful. Redirecting to login...';

      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1000);

    } catch (error: any) {
      console.error('Registration failed:', error);

      if (Array.isArray(error?.error?.errors)) {
        this.serverErrors = error.error.errors;
      } else if (error?.status === 409) {
        this.serverErrors = [
          'An account with this email already exists.'
        ];
      } else {
        this.serverErrors = [
          'Registration failed. Please try again.'
        ];
      }
    } finally {
      this.isLoading = false;
    }
  }
}