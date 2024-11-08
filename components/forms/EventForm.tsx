"use client"

import React, { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod'  
import { eventFormSchema } from '@/schema/events'
import { Form, FormControl, FormField, FormLabel, FormItem, FormMessage, FormDescription } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import Link from 'next/link'
import { Textarea } from '../ui/textarea'
import { Switch } from '../ui/switch'
import { createEvent, deleteEvent, updateEvent } from '@/server/actions/events'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog'

function EventForm({ event }: { event?: {
   id: string,
   name: string ,
   description?: string,
   durationInMinutes: number
   isActive: boolean,
}}) {

    const [isDeletePending, startDeleteTransition] = useTransition()
    const form = useForm<z.infer<typeof eventFormSchema>>({
        resolver: zodResolver(eventFormSchema),
        defaultValues: event ?? {
            isActive: true,
            durationInMinutes: 60
        },
    })

    async function onSumbit (values: z.infer<typeof eventFormSchema>) {

       const action = event == null ? createEvent : updateEvent.bind(null, event.id)

       const data =  await action(values)

       if(data?.error){
        form.setError("root", {
            message: "There was an error creating the event"
        })
       }

       console.log(values);
       
    }

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSumbit)} className='flex flex-col gap-6'> 
            {form.formState.errors.root && (
                <div className='text-destructive text-sm'>
                    {form.formState.errors.root.message}
                </div>
            )}
            <FormField
                control={form.control}
                name='name'
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Event Name</FormLabel>
                        <FormControl>
                            <Input {...field}/>
                        </FormControl>
                        <FormDescription>
                            The name users will see when booking
                        </FormDescription>
                        <FormMessage/>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name='durationInMinutes'
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Duration</FormLabel>
                        <FormControl>
                            <Input type='number' {...field}/>
                        </FormControl>
                        <FormDescription>
                            In minutes
                        </FormDescription>
                        <FormMessage/>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name='description'
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                            <Textarea className="resize-none h-32" {...field}/>
                        </FormControl>
                        <FormDescription>
                            Optional description of the event
                        </FormDescription>
                        <FormMessage/>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name='isActive'
                render={({field}) => (
                    <FormItem>
                        <div className='flex items-center gap-2'>
                            <FormControl>
                                <Switch 
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <FormLabel>Active</FormLabel>
                        </div>
                        <FormDescription>
                            Inactive events will not visible for users to hook
                        </FormDescription>
                        <FormMessage/>
                    </FormItem>
                )}
            />
            <div className='flex gap-2 justify-end'>

                {event && (
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant={'destructiveGhost'} disabled={isDeletePending || form.formState.isSubmitting}>Delete</Button>
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone.This will permanently delete this event.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel >
                                    Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction 
                                    variant={'destructive'}
                                    disabled={isDeletePending || form.formState.isSubmitting}
                                    onClick={() => {
                                        startDeleteTransition(async () => {
                                            const data = await deleteEvent(event.id)

                                            if(data?.error){
                                                form.setError("root", {
                                                    message: "There was an error creating the event"
                                                })
                                               }
                                        })
                                    }}
                                >
                                    Delete
                                </AlertDialogAction>
                            </AlertDialogFooter>

                        </AlertDialogContent>
                    </AlertDialog>
                )}

                <Button type='button' asChild variant={'outline'}>
                    <Link href={'/events'}>
                        Cancel
                    </Link>
                </Button>
                <Button type='submit'>Save</Button>
            </div>

        </form>
    </Form>
  )
}

export default EventForm