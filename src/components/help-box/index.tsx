import React from 'react';
import {
  Box,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Text,
  UnorderedList,
  ListItem,
  Link,
} from '@chakra-ui/react';
import { FiInfo } from 'react-icons/fi';
import { useSession } from '@roq/nextjs';

export const HelpBox: React.FC = () => {
  const ownerRoles = ['Administrator'];
  const roles = ['Content Creator', 'Administrator'];
  const applicationName = `test`;
  const tenantName = `Organization`;
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL;
  const userStories = `Title: Administrator creates an organization

As an Administrator,
I want to create an organization,
So that I can manage my flashcard decks and invite Content Creators.

Acceptance Criteria:
- Ability to create an organization with a unique name
- Ability to set the Administrator as the owner of the organization

---

Title: Administrator invites Content Creator

As an Administrator,
I want to invite Content Creators to my organization,
So that they can create and manage flashcard decks.

Acceptance Criteria:
- Ability to invite Content Creators by email
- Content Creators receive an invitation with a link to join the organization

---

Title: Content Creator accepts invitation

As a Content Creator,
I want to accept an invitation to join an organization,
So that I can create and manage flashcard decks for that organization.

Acceptance Criteria:
- Ability to accept the invitation by clicking the link in the email
- Content Creator is added to the organization upon accepting the invitation

---

Title: Content Creator creates a flashcard deck

As a Content Creator,
I want to create a flashcard deck from a bunch of text,
So that I can provide a learning resource for users.

Acceptance Criteria:
- Ability to input text and create flashcards from it
- Ability to organize flashcards into a deck
- Ability to save the flashcard deck within the organization

---

Title: Content Creator edits a flashcard deck

As a Content Creator,
I want to edit a flashcard deck,
So that I can update or improve the content.

Acceptance Criteria:
- Ability to select a flashcard deck to edit
- Ability to add, remove, or modify flashcards within the deck
- Ability to save the changes to the flashcard deck

---

Title: Administrator removes Content Creator

As an Administrator,
I want to remove a Content Creator from my organization,
So that they no longer have access to create or manage flashcard decks.

Acceptance Criteria:
- Ability to remove a Content Creator from the organization
- Removed Content Creator no longer has access to the organization's flashcard decks`;

  const { session } = useSession();
  if (!process.env.NEXT_PUBLIC_SHOW_BRIEFING || process.env.NEXT_PUBLIC_SHOW_BRIEFING === 'false') {
    return null;
  }
  return (
    <Box width={1} position="fixed" left="30px" bottom="20px" zIndex={3}>
      <Popover placement="top-end">
        <PopoverTrigger>
          <IconButton
            aria-label="Help Info"
            icon={<FiInfo />}
            bg="blue.800"
            color="white"
            _hover={{ bg: 'blue.800' }}
            _active={{ bg: 'blue.800' }}
            _focus={{ bg: 'blue.800' }}
          />
        </PopoverTrigger>
        <PopoverContent w="50vw" h="70vh">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>App Briefing</PopoverHeader>
          <PopoverBody overflowY="auto">
            <Text mb="2">Hi there!</Text>
            <Text mb="2">
              Welcome to {applicationName}, your freshly generated B2B SaaS application. This in-app briefing will guide
              you through your application.
            </Text>
            <Text mb="2">You can use {applicationName} with one of these roles:</Text>
            <UnorderedList mb="2">
              {roles.map((role) => (
                <ListItem key={role}>{role}</ListItem>
              ))}
            </UnorderedList>
            {session?.roqUserId ? (
              <Text mb="2">You are currently logged in as a {session?.user?.roles?.join(', ')}.</Text>
            ) : (
              <Text mb="2">
                Right now, you are not logged in. The best way to start your journey is by signing up as{' '}
                {ownerRoles.join(', ')} and to create your first {tenantName}.
              </Text>
            )}
            <Text mb="2">
              {applicationName} was generated based on these user stories. Feel free to try them out yourself!
            </Text>
            <Box mb="2" whiteSpace="pre-wrap">
              {userStories}
            </Box>
            <Text mb="2">
              If you are happy with the results, then you can get the entire source code here:{' '}
              <Link href={githubUrl} color="cyan.500" isExternal>
                {githubUrl}
              </Link>
            </Text>
            <Text mb="2">
              Console Dashboard: For configuration and customization options, access our console dashboard. Your project
              has already been created and is waiting for your input. Check your emails for the invite.
            </Text>
            <Text mb="2">
              <Link href="https://console.roq.tech" color="cyan.500" isExternal>
                ROQ Console
              </Link>
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};
