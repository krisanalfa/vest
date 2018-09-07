import { Component, Vue } from "nuxt-property-decorator";
import { State } from "vuex-class";
import HelloWorld from "~/components/HelloWorld.vue";

@Component({
  components: {
    HelloWorld,
  },
  name: "HomePage",
})
export default class HomePage extends Vue {
  @State("message") public message: string;
}
