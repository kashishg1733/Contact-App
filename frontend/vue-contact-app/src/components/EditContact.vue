<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-md-6">
        <form @submit.prevent="updateContact">
        <!-- Name -->
          <div class="form-group">
            <input
              type="text"
              v-model="contact.name"
              class="form-control"
              placeholder="Enter Name"
            />
          </div>
          <br/>

          <!-- Email -->
          <div class="form-group">
            <input
              type="email"
              v-model="contact.email"
              class="form-control"
              placeholder="Enter Email"
            />
          </div>
          <br/>

          <!-- Phone -->
          <div class="form-group d-flex gap-2">
            <select v-model="contact.countryCode" class="form-select" style="width: 30%">
              <option value="+91">+91</option>
              <option value="+1">+1</option>
              <option value="+44">+44</option>
              <option value="+61">+61</option>
            </select>

            <input
              type="tel"
              v-model="contact.phone"
              class="form-control"
              placeholder="Enter Phone"
              maxlength="10"
            />
          </div>
          <br/>

          <!-- Designation -->
          <div class="form-group">
            <input
              type="text"
              v-model="contact.designation"
              class="form-control"
              placeholder="Enter Designation"
            />
          </div>

          <button type="submit" class="btn btn-dark btn-sm mt-4">Update</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';
import { useToast } from 'vue-toastification';

const route = useRoute();
const router = useRouter();
const toast = useToast();

const contact = ref({
  name: '',
  email: '',
  phone: '',
  countryCode: '+91',
  designation: ''
});

const nameRegex = /^[a-zA-Z\s]+$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const phoneLengthByCountry = {
  '+91': 10,
  '+1': 10,
  '+44': 10,
  '+61': 9
};

const supportedCountryCodes = ['+91', '+1', '+44', '+61'];

const getContactById = async () => {
    try {
        const url = `http://localhost:3000/api/contacts/${route.params.id}`;
        const response = await axios.get(url);
        const { name, email, phone, designation } = response.data;

        let countryCode = '+91';
        let localPhone = phone;

        for(const code of supportedCountryCodes.sort((a, b) => b.length - a.length)) {
            if (phone.startsWith(code)) {
            countryCode = code;
            localPhone = phone.slice(code.length);
            break;
            }
        }

        contact.value = {
            name,
            email,
            designation,
            countryCode,
            phone: localPhone
        };

    } catch(error) {
    console.log(error);
    toast.error('Failed to load contact data');
  }
};

const updateContact = async () => {
    const { name, email, phone, countryCode, designation } = contact.value;

    if(!name || !email || !phone || !designation) {
        toast.error('All fields are required!');
        return;
    }

    if(!nameRegex.test(name)) {
        toast.error('Name should contain only letters and spaces!');
        return;
    }

    if(!emailRegex.test(email)) {
        toast.error('Please enter a valid email!');
        return;
    }

    if(!/^\d+$/.test(phone)) {
        toast.error('Phone should contain only digits!');
        return;
    }

    const expectedLength = phoneLengthByCountry[countryCode];
    if(expectedLength && phone.length !== expectedLength) {
        toast.error(`Phone number should be ${expectedLength} digits for ${countryCode}`);
        return;
    }

    try{
        const url = `http://localhost:3000/api/contacts/${route.params.id}`;
        const updatedContact = {
            name,
            email,
            phone: `${countryCode}${phone}`,
            designation
        };

        const response = await axios.put(url, updatedContact);

        if (response.status === 200) {
            toast.success('Contact Updated Successfully');
            router.push({ name: 'ContactList' });

            contact.value = {
            name: '',
            email: '',
            phone: '',
            countryCode: '+91',
            designation: ''
            };
        }
    } catch (error) {
        console.log(error);
        toast.error('Something went wrong during update');
    }
};

onMounted(() => {
  getContactById();
});
</script>
