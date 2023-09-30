import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
   
  export function SimpleCard() {
    return (
      <>
      <div className="pt-20 ">
      <p className="ms-6">Polular Food Items</p>
      <div className="flex">

      
      <Card className="w-25 drop-shadow-lg me-5">
        <CardBody className="">
        <img
          src="https://media.istockphoto.com/id/675250860/photo/wild-garlic-and-parsley-meat-free-mycoprotein-sausages.jpg?s=612x612&w=0&k=20&c=5w7ljXdyFlT2xPUpuVHJrQV8uFOwWFdPj8SIMskZHS0="
          alt="card-image"
          width={200}
        />
          <Typography variant="p" color="blue-gray" className="mb-2">
          Ramachandra Parlour
          </Typography>
          <Typography>
            South Indian
          </Typography>
        </CardBody>

      </Card>

      <Card className="w-25 drop-shadow-lg me-20">
        <CardBody className="">
        <img
          src="https://cms.upsidefoods.com/wp-content/uploads/2023/01/FooterBowl_Small.png"
          alt="card-image"
          width={200}
        />
          <Typography variant="p" color="blue-gray" className="mb-2">
          Uma Parlour 
          </Typography>
          <Typography>
          South Indian
          </Typography>
        </CardBody>

      </Card>
      </div>

      </div>
      </>
    );
  }