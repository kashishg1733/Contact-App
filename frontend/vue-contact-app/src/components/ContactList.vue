<template>
    <div class = "container">
        <ClipLoader v-if = "loading"/>
        <table v-else class = "table table-hover">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Contact Number</th>
                    <th>Designation</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody v-for = "contact in contacts" v-bind:key = "contact.id">
                <tr class="table-secondary">
                    <td>{{contact.name}}</td>
                    <td>{{contact.email}}</td>
                    <td>{{contact.phone}}</td>
                    <td>{{contact.designation}}</td>
                    <td>
                        <router-link :to= "{ name: 'EditContact', params: {id: contact._id}}" class = "btn btn-primary btn-sm mr-4">Edit</router-link>
                        <button class = "btn btn-danger btn-sm" @click = "deleteContact(contact._id)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>

    </div>
</template>

<script setup>
    import axios from "axios";
    import {ref, onMounted} from "vue";
    import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
    import {useToast} from 'vue-toastification'
    const apiUrl = 'http://localhost:3000/api/contacts';
    const contacts = ref([]);
    const loading = ref(true);
    const toast = useToast();
    const getContacts = async() => {
        try {
            const response = await axios.get(apiUrl);
            console.log(response.data);
            contacts.value = response.data;
        }
        catch(error) {
            console.log(error);
        } finally {
            loading.value = false;
        }
    }

    const deleteContact = async(id) => {
        try {
            const url = `${apiUrl}/${id}`;
            if(confirm('Are you sure you want to delete the contact?'));
            const response = await axios.delete(url);
            console.log(response);
            if(response.status === 200) {
                toast.success("Contact Deleted Successfully!");
                getContacts();
            }
        } catch(error) {
            console.log(error);
        }
    }

    onMounted(() => {
        console.log('Contact List Component mounted');
        getContacts();
    })
</script>
