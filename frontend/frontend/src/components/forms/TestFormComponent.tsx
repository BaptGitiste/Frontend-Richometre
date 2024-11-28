import { zodResolver } from "@hookform/resolvers/zod";
import { FunctionComponent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";

const SignUpSchema = z.object({
    email: z.string()
        .email("Invalid email"),
    password: z
      .string()
      .min(3, "Too short")
      .max(20, "Too long")
  });
  
type SignUpSchemaType = z.infer<typeof SignUpSchema>;


const TestFormComponent: FunctionComponent = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<SignUpSchemaType>({ resolver: zodResolver(SignUpSchema) });

    const onSubmit: SubmitHandler<SignUpSchemaType> = (data) => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{display: 'flex', flexDirection: 'column'}}>
            <label>Email</label>
            <input type="text" {...register("email")} />
            {errors.email && <span>{errors.email.message}</span>}
            <br/>
            <label>Password</label>
            <input type="password" {...register("password")} />
            {errors.password && <span>{errors.password.message}</span>}
            <br/>
            <button type="submit">Submit</button>
      </form>
    );
};

export default TestFormComponent;