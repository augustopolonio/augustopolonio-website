import { redirect } from 'next/navigation';

export default function UnreleasedProjectsRedirect() {
  redirect('/lab');
}
