import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
   
  export function SimpleCard(props) {
    const products = [
      {
        name: 'Ramachandra Parlour',
        hotel: 'South Indian',
        image: 'https://images.unsplash.com/photo-1602881916963-5daf2d97c06e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cG9rZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80'

      },
      {
        name: 'Ramachandra Parlour',
        hotel: 'South Indian',
        image: 'https://img.freepik.com/free-vector/illustration-delicious-tequenos-with-sauce_23-2148811732.jpg?w=740&t=st=1696593987~exp=1696594587~hmac=a1998677ae38addf466efa24e613ab19461bff57a46acd0d3f5af311e5c0ae6a'

      },
      {
        name: 'Ramachandra Parlour',
        hotel: 'South Indian',
        image: 'https://img.freepik.com/free-vector/watercolor-hot-pot-illustration_52683-53588.jpg?w=740&t=st=1696593928~exp=1696594528~hmac=234dfa8fab0c51b4726825ab3582a69fff25a2a748eb2f78779d8ed2b2db343a'

      },
      {
        name: 'Ramachandra Parlour',
        hotel: 'South Indian',
        image: 'https://img.freepik.com/free-vector/watercolor-hot-pot-illustration_23-2148796112.jpg?w=740&t=st=1696593973~exp=1696594573~hmac=5534a5654f1c00bab9063efd14b17d23359ee01796fbd6f18afb629cc9db7f31'

      },
      {
        name: 'Ramachandra Parlour',
        hotel: 'South Indian',
        image: 'https://img.freepik.com/free-vector/hand-drawn-chicken-biryani_52683-49331.jpg?w=740&t=st=1696594062~exp=1696594662~hmac=9ac88b18a3cf40760c3194a52dc964accb5fc0cdc7454fc4d55f5acbe11c1ad2'

      },
      {
        name: 'Ramachandra Parlour',
        hotel: 'South Indian',
        image: 'https://media.istockphoto.com/id/675250860/photo/wild-garlic-and-parsley-meat-free-mycoprotein-sausages.jpg?s=612x612&w=0&k=20&c=5w7ljXdyFlT2xPUpuVHJrQV8uFOwWFdPj8SIMskZHS0='

      },
      {
        name: 'Ramachandra Parlour',
        hotel: 'South Indian',
        image: 'https://media.istockphoto.com/id/675250860/photo/wild-garlic-and-parsley-meat-free-mycoprotein-sausages.jpg?s=612x612&w=0&k=20&c=5w7ljXdyFlT2xPUpuVHJrQV8uFOwWFdPj8SIMskZHS0='

      },
      {
        name: 'Ramachandra Parlour',
        hotel: 'South Indian',
        image: 'https://media.istockphoto.com/id/675250860/photo/wild-garlic-and-parsley-meat-free-mycoprotein-sausages.jpg?s=612x612&w=0&k=20&c=5w7ljXdyFlT2xPUpuVHJrQV8uFOwWFdPj8SIMskZHS0='

      },
      {
        name: 'Ramachandra Parlour',
        hotel: 'South Indian',
        image: 'https://media.istockphoto.com/id/675250860/photo/wild-garlic-and-parsley-meat-free-mycoprotein-sausages.jpg?s=612x612&w=0&k=20&c=5w7ljXdyFlT2xPUpuVHJrQV8uFOwWFdPj8SIMskZHS0='

      },



    ]
    return (
      <>
      <div className="pt-20">
      <p className="ms-6 mb-3 font-bold">{props.title}</p>
      <div className="flex overflow-scroll scrollbar-hide">

      {
        products.map((product)=>{
          return (

          <Card className="min-w-fit drop-shadow-lg ms-2 mb-2 mt-2  ">
            <CardBody className="">
            <img
              src={product.image}
              alt="card-image"
              width={200}
            />
              <Typography variant="p" color="blue-gray" className="mb-2">
              {product.name}
              </Typography>
              <Typography>
                {product.hotel}
              </Typography>
            </CardBody>

          </Card>
          )
        })
      }
      

      </div>

      </div>
      </>
    );
  }