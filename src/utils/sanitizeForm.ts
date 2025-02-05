class SanitizeForm {
    validateInput(type: string, value: string | number | boolean): string {
        switch (type) {
            case 'email': {
                const regex_email = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}(\.[a-zA-Z]{1,})?$/;
                if (typeof value !== 'string') {
                    return 'Email must be a string';
                }
                if (value.length == 0) {
                    return '';
                }
                if (!regex_email.test(value)) {
                    return 'Invalid email format. Please enter a valid email address';
                }
                return '';
            }

            case 'password': {
                if (typeof value !== 'string') {
                    return 'Password must be a string';
                }
                if (value.length == 0) {
                    return '';
                }
                
                if (value.length < 8) {
                    return 'Password is too short. It must be at least 8 characters long';
                }

                if (!/[A-Z]/.test(value)) {
                    return 'Password must contain at least one uppercase letter';
                }

                if (!/[a-z]/.test(value)) {
                    return 'Password must contain at least one lowercase letter';
                }

                if (!/\d/.test(value)) {
                    return 'Password must contain at least one number';
                }

                // if (!/[@$!%*?&]/.test(value)) {
                //     return 'Password must contain at least one special character (@, $, !, %, *, ?, &)';
                // }

                return '';
            }

            default:
                return '';
        }
    }
}

export const sanitizerForm = new SanitizeForm();
