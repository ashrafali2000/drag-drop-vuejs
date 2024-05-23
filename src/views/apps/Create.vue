<template>
  <main>
    <section class="section">
      <div class="container">
        <h2 class="title">Create a new prototype</h2>
        <div class="columns">
          <div class="column is-6">
            <form>
              <div class="form-group">
                <label>Name</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="name"
                  placeholder="Enter App name"
                  ref="inputName"
                />
                <div data-binding-error="name"></div>
              </div>

              <div class="form-group">
                <label>ScreenSize *</label>
                <ScreenSizeSelector @change="setType" />
              </div>
            </form>
          </div>
        </div>

        <div class="MatcButtonBar">
          <a class="MatcButton MatcButtonPrimary" @click="create">Create</a>
          <a href="#/apps/my-apps.html" class="MatcLinkButton">Cancel</a>
        </div>

        <p class="has-text-grey is-size-6 MatcMarginTop">
          * The screen size is measured in points and not pixel!
        </p>
      </div>
    </section>
  </main>
</template>
<script>
import Logger from "common/Logger";
import DojoWidget from "dojo/DojoWidget";
import Services from "services/Services";
import ScreenSizeSelector from "page/ScreenSizeSelector";
import ModelFactory from "core/ModelFactory";

export default {
  name: "Create",
  mixins: [DojoWidget],
  data: function () {
    return {
      name: "",
      type: null,
    };
  },
  watch: {},
  components: {
    ScreenSizeSelector: ScreenSizeSelector,
  },
  methods: {
    setType(t) {
      this.type = t;
    },
    async create() {
      if (this.$route.meta && this.$route.meta.isTryout) {
        this.logger.info("create", "enter > tryout");
        location.href = `#/apps/tryout2.html?w=${this.type.screenSize.w}&h=${this.type.screenSize.h}&t=${this.type.type}`;
      } else {
        this.logger.info("create", "enter > user");
        let fac = new ModelFactory();
        let model = fac.createAppModel(this.name, "", this.type);
        let app = await Services.getModelService().createApp(model);
        if (app && app.id) {
          location.href = "#/apps/" + app.id + "/create.html";
        } else {
          this.showError("Could not create app");
        }
      }
    },
  },
  async mounted() {
    this.logger = new Logger("Create");
    setTimeout(() => {
      if (this.$refs.inputName) {
        this.$refs.inputName.focus();
      }
    }, 50);
  },
};
</script>

<!-- new Code -->
<!-- <template>
  <main>
    <section class="section">
      <div class="container">
        <h2 class="title">Create a new prototype 1</h2>
        <div class="columns">
          <div class="column is-6">
            <form>
              <div class="form-group">
                <label>Name</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="name"
                  placeholder="Enter App name"
                  ref="inputName"
                />
                <div data-binding-error="name"></div>
              </div>

              <div class="form-group">
                <label>ScreenSize *</label>
                <ScreenSizeSelector @change="setType" />
              </div>

              <div class="form-group">
                <label>Recipient Email</label>
                <input
                  type="email"
                  class="form-control"
                  v-model="recipientEmail"
                  placeholder="Enter recipient's email"
                />
              </div>
            </form>
          </div>
        </div>

        <div class="MatcButtonBar">
          <a class="MatcButton MatcButtonPrimary" @click="create">Create</a>
          <a href="#/apps/my-apps.html" class="MatcLinkButton">Cancel</a>
          <a class="MatcButtonPrimary MatcButton" @click="share">Share</a>
        </div>

        <p class="has-text-grey is-size-6 MatcMarginTop">
          * The screen size is measured in points and not pixel!
        </p>
      </div>
    </section>
  </main>
</template>

<script>
import Logger from "common/Logger";
import DojoWidget from "dojo/DojoWidget";
import Services from "services/Services";
import ScreenSizeSelector from "page/ScreenSizeSelector";
import ModelFactory from "core/ModelFactory";

export default {
  name: "Create",
  mixins: [DojoWidget],
  data: function () {
    return {
      name: "",
      type: null,
      recipientEmail: "",
    };
  },
  components: {
    ScreenSizeSelector: ScreenSizeSelector,
  },
  methods: {
    setType(t) {
      this.type = t;
    },
    async create() {
      if (this.$route.meta && this.$route.meta.isTryout) {
        this.logger.info("create", "enter > tryout");
        location.href = `#/apps/tryout2.html?w=${this.type.screenSize.w}&h=${this.type.screenSize.h}&t=${this.type.type}`;
      } else {
        this.logger.info("create", "enter > user");
        let fac = new ModelFactory();
        let model = fac.createAppModel(this.name, "", this.type);
        let app = await Services.getModelService().createApp(model);
        if (app && app.id) {
          location.href = "#/apps/" + app.id + "/create.html";
        } else {
          this.showError("Could not create app");
        }
      }
    },
    async share() {
      try {
        const response = await fetch("http://localhost:3000/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: this.recipientEmail,
            subject: "Check out this new prototype",
            text: `Hey, I just created a new prototype named ${this.name} with screen size ${this.type.screenSize.w}x${this.type.screenSize.h}.`,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to send email");
        }

        const result = await response.json();
        console.log(result);
        alert("Email sent successfully");
      } catch (error) {
        console.error("Error sending email:", error);
        alert("Error sending email");
      }
    },
  },
  async mounted() {
    this.logger = new Logger("Create");
    setTimeout(() => {
      if (this.$refs.inputName) {
        this.$refs.inputName.focus();
      }
    }, 50);
  },
};
</script> -->
