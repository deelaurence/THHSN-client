import InformationPage from "../../components/InformationPage"
import { sdk } from "../../utils/sdk";
const ContactUs = () => {
  const title = "Contact Us"
  const {contactLinks} = sdk
  
  //console.log(contactLinks)
  const sections = [
    {
      header: "Get in Touch",
      content:
        "We would love to hear from you! Whether you have a question, feedback, or need support, feel free to reach out.",
    },
    {
      header: "Looking forward to your mail",
      content: "You can contact us via our email on every business day",
      list: ["Email: betranbunds@gmail.com"],
    },
    {
      header: "Support",
      content: "For any inquiries, our support team is available 24/7 to assist you. Stay updated with our latest news and updates by following us on social media.",
      links:contactLinks[2].items.map((item)=>{
        return {
            text:item.name,
            href:item.url
        }
      })
      
    //   [
    //     { text: "Twitter", href: "https://twitter.com/example", external: true },
    //     { text: "LinkedIn", href: "https://linkedin.com/company/example", external: true },
    //   ]
      ,
    },
  ];
  
    
  return (
    <InformationPage sections={sections} title={title}/>
)
}

export default ContactUs