
        const navbar = document.querySelector('.navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        const hamburger = document.querySelector('.hamburger');
        const sideMenu = document.querySelector('.side-menu');
        const menuOverlay = document.querySelector('.menu-overlay');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            sideMenu.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            document.body.style.overflow = sideMenu.classList.contains('active') ? 'hidden' : '';
        });

        menuOverlay.addEventListener('click', () => {
            hamburger.classList.remove('active');
            sideMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });

        document.querySelectorAll('.side-menu-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                sideMenu.classList.remove('active');
                menuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-up, .fade-left, .fade-right, .fade-scale').forEach(el => {
            observer.observe(el);
        });

        class MultiStepForm {
            constructor(formId) {
                this.form = document.getElementById(formId);
                this.progressSteps = document.querySelectorAll('.progress-step');
                this.progressLines = document.querySelectorAll('.progress-line');
                this.successMessage = document.getElementById('successMessage');

                this.currentStep = 1;
                this.selectedProfile = null;
                this.formData = {};

                this.init();
            }

            init() {
                this.bindNavigationEvents();
                this.bindProfileSelection();
                this.bindFormSubmission();
                this.bindResetButton();
                this.bindInputValidation();
            }

            bindNavigationEvents() {
                document.querySelectorAll('.btn-next').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const nextStep = parseInt(btn.dataset.next);
                        if (this.validateCurrentStep()) {
                            this.goToStep(nextStep);
                        }
                    });
                });

                document.querySelectorAll('.btn-prev').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const prevStep = parseInt(btn.dataset.prev);
                        this.goToStep(prevStep);
                    });
                });
            }

            goToStep(stepNumber) {
                document.querySelectorAll('.form-step').forEach(step => {
                    step.classList.remove('active');
                });

                if (stepNumber === 3 && this.selectedProfile) {
                    const conditionalStep = document.querySelector(
                        '.form-step[data-step="3"][data-profile="' + this.selectedProfile + '"]'
                    );
                    if (conditionalStep) conditionalStep.classList.add('active');
                } else {
                    const targetStep = document.querySelector(
                        '.form-step[data-step="' + stepNumber + '"]:not(.conditional-step)'
                    );
                    if (targetStep) targetStep.classList.add('active');
                }

                this.updateProgressBar(stepNumber);
                this.currentStep = stepNumber;
                document.querySelector('.form-container').scrollIntoView({ behavior: 'smooth', block: 'start' });
            }

            updateProgressBar(currentStep) {
                this.progressSteps.forEach((step, index) => {
                    const stepNum = index + 1;
                    step.classList.remove('active', 'completed');

                    if (stepNum < currentStep) {
                        step.classList.add('completed');
                    } else if (stepNum === currentStep) {
                        step.classList.add('active');
                    }
                });

                this.progressLines.forEach((line, index) => {
                    if (index < currentStep - 1) {
                        line.classList.add('completed');
                    } else {
                        line.classList.remove('completed');
                    }
                });
            }

            bindProfileSelection() {
                const profileRadios = document.querySelectorAll('input[name="profileType"]');
                profileRadios.forEach(radio => {
                    radio.addEventListener('change', (e) => {
                        this.selectedProfile = e.target.value;
                        this.clearError('profileType');
                    });
                });
            }

            bindInputValidation() {
                const inputs = this.form.querySelectorAll('input, select, textarea');
                inputs.forEach(input => {
                    input.addEventListener('blur', () => this.validateField(input));
                    input.addEventListener('input', () => {
                        if (input.classList.contains('error')) {
                            this.validateField(input);
                        }
                    });
                });
            }

            validateCurrentStep() {
                const currentStepElement = document.querySelector('.form-step.active');
                const inputs = currentStepElement.querySelectorAll('[required]');
                let isValid = true;

                inputs.forEach(input => {
                    if (!this.validateField(input)) {
                        isValid = false;
                    }
                });

                return isValid;
            }

            validateField(input) {
                const value = input.value.trim();
                const name = input.name;
                let isValid = true;
                let errorMessage = '';

                if (input.required && !value) {
                    if (input.type === 'radio') {
                        const radioGroup = document.querySelectorAll('input[name="' + name + '"]');
                        const isChecked = Array.from(radioGroup).some(r => r.checked);
                        if (!isChecked) {
                            isValid = false;
                            errorMessage = 'Please make a selection';
                        }
                    } else {
                        isValid = false;
                        errorMessage = 'This field is required';
                    }
                }

                if (input.type === 'email' && value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) {
                        isValid = false;
                        errorMessage = 'Please enter a valid email address';
                    }
                }

                if (input.type === 'tel' && value) {
                    const phoneRegex = /^[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/;
                    if (!phoneRegex.test(value.replace(/\s/g, ''))) {
                        isValid = false;
                        errorMessage = 'Please enter a valid phone number';
                    }
                }

                if (input.type === 'number' && value) {
                    const num = parseInt(value);
                    const min = parseInt(input.min) || 1;
                    const max = parseInt(input.max) || 100;
                    if (num < min || num > max) {
                        isValid = false;
                        errorMessage = 'Please enter a number between ' + min + ' and ' + max;
                    }
                }

                if (isValid) {
                    this.clearError(name, input);
                    if (value && input.type !== 'radio') {
                        input.classList.add('valid');
                    }
                } else {
                    this.showError(name, errorMessage, input);
                }

                return isValid;
            }

            showError(fieldName, message, input) {
                const errorElement = document.getElementById(fieldName + 'Error');
                if (errorElement) errorElement.textContent = message;
                if (input && input.type !== 'radio') {
                    input.classList.add('error');
                    input.classList.remove('valid');
                }
            }

            clearError(fieldName, input) {
                const errorElement = document.getElementById(fieldName + 'Error');
                if (errorElement) errorElement.textContent = '';
                if (input) input.classList.remove('error');
            }

            bindFormSubmission() {
                this.form.addEventListener('submit', async (e) => {
                    e.preventDefault();

                    if (!this.validateCurrentStep()) return;

                    this.collectFormData();

                    const submitBtn = this.form.querySelector('.btn-submit');
                    const originalHtml = submitBtn.innerHTML;
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<span class="loader"></span> Sending...';

                    try {
                        await this.submitToBackend(this.formData);
                        this.showSuccess();
                    } catch (error) {
                        console.error('Submission error:', error);
                        alert('An error occurred. Please try again.');
                    } finally {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalHtml;
                    }
                });
            }

            collectFormData() {
                const formData = new FormData(this.form);
                this.formData = {
                    lastName: formData.get('lastName'),
                    firstName: formData.get('firstName'),
                    email: formData.get('email'),
                    phone: formData.get('phone'),
                    profileType: formData.get('profileType'),
                    ...(this.selectedProfile === 'visitor'
                        ? {
                            country: formData.get('visitorCountry'),
                            interests: formData.get('interests'),
                            numberOfTickets: formData.get('numberOfTickets')
                        }
                        : {
                            companyName: formData.get('companyName'),
                            sector: formData.get('sector'),
                            boothSize: formData.get('boothSize'),
                            objective: formData.get('objective')
                        }),
                    submittedAt: new Date().toISOString()
                };

                console.log('Form data collected:', this.formData);
                return this.formData;
            }

            async submitToBackend(data) {
                const response = await fetch('https://formspree.io/f/xlgrjopa', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (!response.ok) {
                    throw new Error('Server error');
                }

                return response.json();
            }

            showSuccess() {
                this.form.style.display = 'none';
                document.querySelector('.progress-bar').style.display = 'none';
                this.successMessage.classList.add('active');
            }

            bindResetButton() {
                document.getElementById('resetForm').addEventListener('click', () => {
                    this.form.reset();
                    this.currentStep = 1;
                    this.selectedProfile = null;
                    this.formData = {};

                    this.form.style.display = 'block';
                    document.querySelector('.progress-bar').style.display = 'flex';
                    this.successMessage.classList.remove('active');

                    this.goToStep(1);

                    this.form.querySelectorAll('.error, .valid').forEach(el => {
                        el.classList.remove('error', 'valid');
                    });
                    this.form.querySelectorAll('.error-message').forEach(el => {
                        el.textContent = '';
                    });
                });
            }
        }

        document.addEventListener('DOMContentLoaded', () => {
            new MultiStepForm('multiStepForm');
        });
    