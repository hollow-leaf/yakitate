import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog-for-Provide"
import { Button } from "@/components/ui/button"
import { Input } from "../ui/input"
import React, { useState } from "react";
import { provide_food } from "@/service/provider/provider";
import { peraWallet } from "@/service/perawallet";


export function ProvideBtn() {
  
  const [inputfood, setInputfood] = useState<string>('');
  const [inputamount, setInputamount] = useState<string>('');
  
  const handleInputfood = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setInputfood(e.target.value)
  }
  const handleInputamount = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setInputamount(e.target.value)
  }
  const handleSubmit = async()=>{
    const numberValue: number = parseInt(inputamount, 10);
    if(peraWallet.connector?.accounts[0]){
        await provide_food(peraWallet.connector?.accounts[0],inputfood,numberValue)
    }else{
      alert("Connect Wallet!")
    }
  }


  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Provide</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <div>
          food:
          <Input type="text" onChange={(e)=>handleInputfood(e)}/>
          amount:
          <Input type="text" onChange={(e)=>handleInputamount(e)}/>
          <br/>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit}>Submit</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
